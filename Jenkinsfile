pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/sejaltapadiya/SPE_Major.git'
    }

    stages {
        stage('Cleanup') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh 'docker rm -f prosepetals-frontend || true'
                    sh 'docker rm -f prosepetals-backend || true'
                    sh 'docker rm -f database-container || true'
                    // Remove the network if it exists
                    sh 'docker network rm prosepetals-network || true'
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    // Checkout the code from GitHub
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                }
            }
        }

        stage('Create Network') {
            steps {
                // Create a Docker network for the services
                sh 'docker network create prosepetals-network'
                sleep 10
            }
        }

        stage('Start Database') {
            steps {
                script {
                    // Run the database container
                    sh '''
                    docker run -d --name database-container --network prosepetals-network \
                    -e MYSQL_ROOT_PASSWORD=root \
                    -e MYSQL_DATABASE=prosepetals \
                    -e MYSQL_USER=user \
                    -e MYSQL_PASSWORD=password \
                    -v prosepetals-db-data:/var/lib/mysql \
                    mysql:latest
                    '''
                    // Give the database some time to initialize
                    sleep 20
                }
            }
        }

        stage('Maven Build') {
            steps {
                dir('./BACKEND/ProsePetal') {
                    // Perform Maven build
                    sh "mvn clean package"
                    sh "mvn clean install"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build the backend Docker image
                    dir('./BACKEND/ProsePetal') {
                        docker.build("sejal28/prosepetals-backend", '.')
                    }
                    // Build the frontend Docker image
                    dir('./FRONTEND') {
                        docker.build("sejal28/prosepetals-frontend", '.')
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Push the Docker images to DockerHub
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push sejal28/prosepetals-frontend:latest'
                        sh 'docker push sejal28/prosepetals-backend:latest'
                    }
                }
            }
        }

        stage('Start Docker Compose stack') {
            steps {
                script {
                    // Use Docker Compose to bring up the stack
                    sh 'docker-compose down --remove-orphans' // Clean up any orphan containers
                    sh 'docker-compose up -d' // Start the Docker Compose stack
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for more details.'
        }
    }
}
