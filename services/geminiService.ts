
import { GoogleGenAI } from "@google/genai";
import { DeploymentConfig } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getProviderDetails = (provider: string) => {
  switch (provider) {
    case 'aws':
      return {
        name: 'AWS',
        cli: 'aws-cli',
        frontendService: 'S3 for static hosting with CloudFront for CDN',
        backendService: 'Lambda with API Gateway (Serverless)',
        databaseService: {
          postgres: 'RDS for PostgreSQL',
          mysql: 'RDS for MySQL',
          mongodb: 'DocumentDB',
        },
      };
    case 'gcp':
      return {
        name: 'Google Cloud Platform (GCP)',
        cli: 'gcloud',
        frontendService: 'Cloud Storage with Cloud CDN',
        backendService: 'Cloud Functions (2nd gen)',
        databaseService: {
          postgres: 'Cloud SQL for PostgreSQL',
          mysql: 'Cloud SQL for MySQL',
          mongodb: 'MongoDB Atlas on GCP or a self-managed solution',
        },
      };
    case 'azure':
      return {
        name: 'Microsoft Azure',
        cli: 'az-cli',
        frontendService: 'Azure Blob Storage (static website) with Azure CDN',
        backendService: 'Azure Functions',
        databaseService: {
          postgres: 'Azure Database for PostgreSQL',
          mysql: 'Azure Database for MySQL',
          mongodb: 'Azure Cosmos DB for MongoDB',
        },
      };
    default:
      throw new Error('Invalid cloud provider');
  }
};

export const generateDeploymentScript = async (config: DeploymentConfig): Promise<string> => {
  if (!config.provider) {
    throw new Error('Cloud provider is not selected.');
  }

  const providerDetails = getProviderDetails(config.provider);
  const dbService = config.backend.database !== 'none' ? providerDetails.databaseService[config.backend.database] : 'No database';

  const prompt = `
    You are an expert DevOps engineer. Generate a comprehensive, single bash script to automate the deployment of a modern web application to ${providerDetails.name}.
    The script must be production-ready, scalable, and follow security best practices.
    The user will run this script from their local machine, where they have the ${providerDetails.cli} installed and authenticated.

    Here are the user's specifications:
    - **Cloud Provider:** ${providerDetails.name}
    
    - **Frontend Application:**
      - Git Repository URL: ${config.frontend.repoUrl}
      - Build Command: \`${config.frontend.buildCommand}\`
      - Build Output Directory: \`${config.frontend.outputDir}\`
      - Deployment Strategy: Deploy as a static site using ${providerDetails.frontendService}. Ensure it's publicly accessible via a CDN URL.

    - **Backend Application:**
      - Git Repository URL: ${config.backend.repoUrl}
      - Runtime: ${config.backend.runtime}
      - Deployment Strategy: Deploy as a scalable, serverless solution using ${providerDetails.backendService}. The function(s) should be triggerable via HTTP.
    
    - **Database:**
      - Type: ${config.backend.database}
      - Service: ${dbService}. If a database is specified, provision a managed, scalable instance. The script should output the connection string securely. If 'none', skip this step entirely.

    **Requirements for the generated script:**

    1.  **Structure and Readability:**
        - Start with \`#!/bin/bash\` and \`set -e\` to ensure it fails on error.
        - Use functions (e.g., \`deploy_frontend()\`, \`deploy_backend()\`) to modularize the script.
        - Add extensive comments (\`#\`) to explain each command and section.
        - Use colored \`echo\` statements (e.g., using ANSI escape codes) to indicate progress, success, and warnings. This is crucial for user experience.

    2.  **Configuration:**
        - Define user-configurable variables at the top of the script (e.g., REGION, PROJECT_ID/RESOURCE_GROUP_NAME, APP_NAME). Provide sensible defaults.
        - Do not hardcode secrets. For database passwords, generate a random one and echo it to the user at the end.

    3.  **Execution Flow:**
        - The script should check for dependencies (like git, npm, and the cloud CLI) before starting.
        - Clone the frontend and backend repositories into a temporary directory.
        - Run the build command for the frontend.
        - Provision all necessary cloud infrastructure (storage buckets, CDNs, serverless functions, API gateways, databases).
        - Deploy the frontend assets.
        - Package and deploy the backend code.
        - At the very end, print a summary of all created resources, including the public URL for the frontend and the API endpoint for the backend.

    4.  **Best Practices:**
        - For storage, ensure public access is configured correctly and securely for static hosting.
        - For serverless functions, configure appropriate IAM roles/permissions with the principle of least privilege.
        - For databases, place them in a secure network configuration and do not expose them to the public internet directly. The serverless function should be configured with the necessary credentials to access it (e.g., via environment variables or a secret manager).

    Produce only the raw bash script code inside a single block, ready to be copied and saved as a \`.sh\` file. Do not wrap it in markdown backticks or any other formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          temperature: 0.2,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate deployment script. The AI service may be temporarily unavailable.");
  }
};
