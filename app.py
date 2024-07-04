#!/usr/bin/python3
"""RUn the Budgtr aPplication"""

from flask import Flask, render_template
app = Flask(__name__)


@app.route('/', strict_slashes=False)
def index():
    """Index Home"""
    return render_template('index.html', page='index')

@app.route('/login', strict_slashes=False)
def login():
    """Login Page"""
    return render_template('login.html', page='login')

@app.route('/signup', strict_slashes=False)
def signup():
    """Signup Page"""
    return render_template('signup.html', page='signup')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000', debug=True)