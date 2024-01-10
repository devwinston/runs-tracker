A full MERN stack web application featuring basic yet important concepts such as (1) CRUD operations with non-SQL database, (2) user authentication with JWT and password hashing, and (3) route authorisation with middleware (for backend) and re-navigation (for frontend).

User Account (Demo)
Email: user@email.com
Password: P@ssword12345

[Live Site](https://mern-tutorial-ale1.onrender.com/)

[![My Skills](https://skillicons.dev/icons?i=react,nodejs,express,mongodb)](https://skillicons.dev)

To start developing,

1. Delete .git folder in client
2. Move .gitignore file to root
3. Create .env file in root
4. Add .env to .gitignore file
5. Initialise git in root
6. Initialise npm in server
7. Initialise npm in root

To start deploying,

1. Refer to deployment commits
2. Create new web service on Render
3. Add "npm run build" (ensure build script exists) under Build Command
4. Add "npm run start" (ensure start script exists) under Start Command
5. Add environment variables (e.g. JWT secret, MongoDB URI, etc.)
6. Connect > Outbound > copy IP address(es) in Render
7. Security > Network Access > IP Access List > add IP address(es) in MongoDB
