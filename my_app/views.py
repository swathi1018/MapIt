# Views at the end of Workshop 2

# from my_app import app, db
from my_app import app
from flask import render_template, request, redirect
# from my_app.models import Fact, Post

# name="My Name"
# facts = {"Birthday":"September 18th, 2020", "Favorite Color": "blue", "Favorite Hackathon": "HackMIT"}
# posts = []


@app.route("/")
def index():
    """
    [GET]: 
        - args: none
        - return: index.html
    """

    return render_template("index.html")