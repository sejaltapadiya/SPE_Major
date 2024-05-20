pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/sejaltapadiya/SPE_Major.git'
     }
     stages{
	stage('Cleanup') {
            steps {
                script{   
                sh 'docker rm -f prosepetals-frontend'
		        sh 'docker rm -f prosepetals-backend'
                }
            }
        }
	  stage('Checkout'){
	    steps{
		script{
		git branch: 'main', url: "${GITHUB_REPO_URL}"
            }
         }
       }
         stage('Maven Build') {
         steps {
         dir('./BACKEND/ProsePetal') {
             sh "mvn clean install"
            }
          }
        }
        stage('Build Docker Images') {	
            steps {
               script {
		dir('./BACKEND/ProsePetal') {
		docker.build("sejal28/prosepetals-backend", '.')
                }
                 dir('./FRONTEND') {
                 docker.build("sejal28/prosepetals-frontend", '.')
                }
              }
           }
        }
      stage('Push Docker Images') {
       steps {
         script {
            docker.withRegistry('', 'DockerHubCred') {
                sh 'docker push sejal28/prosepetals-frontend:latest'
		        sh 'docker push sejal28/prosepetals-backend:latest'
              }
           }
        }
      }
      stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'Playbook.yml',
                        inventory: 'Inventory'
                     )
                }
            }
        }
   }
}