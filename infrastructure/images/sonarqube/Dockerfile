FROM sonarqube:10.1.0-community

# Ajoutez des configurations personnalisées
COPY sonar.properties /opt/sonarqube/conf/sonar.properties

# Installez des plugins supplémentaires
COPY my-plugin.jar /opt/sonarqube/extensions/plugins/my-plugin.jar
