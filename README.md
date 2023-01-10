# AplicatieLicitatii
Proiect PAW si SD

Etape utilizare Apache Kafka

1- pornesc zookeeper 
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties

2- pornesc broker kafka
.\bin\windows\kafka-server-start.bat .\config\server.properties
sau 
.\bin\windows\kafka-server-start .\config\server.properties

3- creare topic (odata creat, aceasta etapa este omisa)
.\bin\windows\kafka-topics.bat --create --topic topic-nume --bootstrap-server localhost:9092  --replication-factor 1 --partitions 1

Dupa crearea unui topic, se listeaza toate topicele pentru siguranta
.\bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092

4- creare consumator
.\bin\windows\kafka-console-consumer --bootstrap-server localhost:9092 --topic kafka-chat-3



