from flask import Flask
from flask import render_template
from flask import request

app = Flask(__name__)


@app.route('/')
def index():
    error = None
    return render_template('index.html')


@app.route('/contactme', methods=['POST'])
def process_message():
    error = None
    if request.method == 'POST':
        message_posted()


def message_posted():
    sender = request.form['contactName']
    email = request.form['contactEmail']
    business = request.form['business']
    msg = request.form['message']
    pass

