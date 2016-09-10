from flask import Flask
from flask import request

app = Flask(__name__)


@app.route('/contactme', methods=['POST'])
def process_message():
    error = None
    if request.method == 'POST':
        message_posted()


def message_posted():
    sender = request.form['sender']
    msg = request.form['message']
    pass

