# COS30043 - 6.2 D HD - Custom Web Application by Ta Quang Tung - 104222196

## Setup instructions

To run this project on your local machine, please follow these steps:

1. Install Node.js - You can follow the installation instructions on [Node's official website.](https://nodejs.org/en/download/package-manager) To check if Node has been installed, open the terminal and type the command `node -v`, which will show its current version.

2. Install MySQL server - Again, you can follow the installation instructions on [MySQL's official website](https://dev.mysql.com/downloads/mysql/). Alternatively, if you have XAMPP installed, you may already have MySQL.

3. Install MinIO - This service is very similar to Amazon S3 and is used by the project to store users' photos. The easiest way to set up MinIO is to run it as a Docker container.

    - Install Docker Desktop by following the instructions on [its official website](https://www.docker.com/products/docker-desktop/).

    - With Docker installed, run the following commands in the terminal:

    ```
    # For Linux or MacOS

    mkdir -p ~/minio/data

    docker run -p 9000:9000 -p 9001:9001 --name minio -v ~/minio/data:/data -e "MINIO_ROOT_USER=minioadmin" -e "MINIO_ROOT_PASSWORD=minioadmin" quay.io/minio/minio server /data --console-address ":9001"
    ```

    ```
    # For Windows

    docker run -p 9000:9000 -p 9001:9001 --name minio -v D:\minio\data:/data -e "MINIO_ROOT_USER=minioadmin" -e "MINIO_ROOT_PASSWORD=minioadmin" quay.io/minio/minio server /data --console-address ":9001"
    ```

    You can replace `~/minio/data` or `D:\minio\data` with any directory on your local machine as long as you have read, write, and delete permissions.

    - After the MinIO container is up an running, you can access its console on `http://localhost:9001`. It will look like this:

    ![MinIO login screen](/minio_login.png)

    - Type in both the username and password as `minioadmin`, then click Login.

    - In the homepage and on the left panel, click "Access Keys" > "Create access key +". Type in both the access key and secrey key as `tmtsocialmediaapp`. Click "Create" and confirm.

    ![MinIO key screen](/minio_keys.png)

4. Clone the repository with the terminal command:

```
git clone https://github.com/pine04/cos30043-tmt
```

5. Go inside the `tmt-backend` folder and find the `schema.sql` file. Run the SQL code inside it using your preferred method (MySQL Command Line Client, MySQL Workbench, PHPMyAdmin, etc.) to create the database.

6. Inside the `tmt-backend` folder, duplicate the `.env-template` file and rename it to `.env`. Open the file and update `DB_USER` and `DB_PASSWORD` as necessary.

7. With your terminal inside the `tmt-backend` directory, run `npm install` to install all the necessary dependencies.

8. Run `npm start` to start the backend.

9. Inside your terminal, navigate to the `tmt-frontend` directory and run `npm install` to install all the necessary dependencies.

10. Run `npm run dev` to start the frontend development server. If everything is correct, the project will be accessible on `http://localhost:5173`.

## Help and support

If you run into any issues while setting up the project or have any questions, please send me an email at tunggnut2004@gmail.com.