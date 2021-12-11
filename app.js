/**
 * Import express and store in a constant.
 */
const express = require("express");

/**
 * Create an express application by running express as a function,
 * and store it to a constant.
 */
const app = express();

/**
 * Define the port number that the express application should use.
 */
const port = 3000;

/**
 * Import the database connection file.
 */
const db = require("./config/database");

/**
 * Import the Post model.
 */
const PostModel = require("./models/Post");

/**
 * Handle the POST request to create a post.
 */
app.post("/create-post", (req, res, next) => {
    /**
     * Call the create function on the Post model, and pass the data that you receive.
     */
    PostModel.create({
        title: "Some Title",
        subtitle: "Some Subtitle",
        content: "Some Content",
    }).then((result) => {
        return res.json({
            message: "Record created successfully!",
        });
    }).catch((error) => {
        console.log(error);
        return res.json({
            message: "Unable to create a record!",
        });
    });
});

/**
 * Handle the GET request to fetch a single post.
 */
app.get("/get-latest-post", (req, res, next) => {
    /**
     * Call the findOne function on the Post model.
     * 
     * You can pass the name of the columns you
     * want in the result by using the 'attributes' key.
     * 
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value for any coumn.
     */
    PostModel.findOne({
        attributes: ['id', 'title'],
        where: {
            id: 1
        }
    }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.json({});
    });
});

/**
 * Handle the GET request to fetch all posts.
 */
app.get("/get-all-posts", (req, res, next) => {
    /**
     * Call the findAll function on the Post model.
     *
     * You can pass the name of the columns you
     * want in the result by using the 'attributes' key.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value for any coumn.
     */
    PostModel.findAll({
        attributes: ["id", "title"]
    }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.json({});
    });
});

/**
 * Handle the POST request to update a single post.
 */
app.post("/update-post", (req, res, next) => {
    /**
     * Call the update function on the Post model.
     *
     * You can pass the name of the columns and their new value
     * in JSON format.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value to update the specific record.
     */
    PostModel.update({
            title: "Updated Title Name!",
        }, {
            where: {
                id: 1,
            },
        })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({});
        });
});

/**
 * Handle the POST request to delete a single post.
 */
app.post("/delete-post", (req, res, next) => {
    /**
     * Call the destroy function on the Post model.
     *
     * You can use the 'where' condition by using
     * the 'where' key, and passing the value to delete the specific record.
     */
    PostModel.destroy({
            where: {
                id: 1,
            },
        })
        .then((result) => {
            return res.json(result);
        })
        .catch((error) => {
            console.log(error);
            return res.json({});
        });
});

/**
 * Create a anonymous function to establish the database connection.
 * After the connection is established, start the server.
 */
const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        /**
         * Syncronize the Post model.
         */
        PostModel.sync({
            alter: true,
        });

        /**
         * Start the web server on the specified port.
         */
        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

/**
 * Initialize the application.
 */
initApp();