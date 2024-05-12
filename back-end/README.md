<p align="center">
  <img src="https://seeklogo.com/images/S/spring-logo-9A2BC78AAF-seeklogo.com.png" width="200">
</p>

<h3 align="center">Back-end Template</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/antonioclp/spring-template) 
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/antonioclp/spring-template.svg)](https://github.com/antonioclp/spring-template)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

> [!NOTE]\
> Template for development of back-end projects.

| *Pom.xml* |
| --- |
| **Spring Web** |
| **Spring Data JPA** |
| **Spring DevTools** |
| **MySQL Driver** |

### Usage

```bash
git clone git@github.com:antonioclp/spring-template.git

cd spring-template

docker-compose up -d

mvn spring-boot:run
```

### Docker-compose

```yaml
version: "3.8"

services:
  db:
    container_name: db
    image: mysql:8.0.32
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=db
    ports:
      - 3306:3306
```

### Application.properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```
