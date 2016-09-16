from flask import Flask, render_template, request, jsonify
from smtplib import SMTP
from email.mime.text import MIMEText

app = Flask(__name__)


@app.route('/')
def index():
    error = None
    return render_template('index.html')


@app.route('/contactme', methods=['POST'])
def process_message():
    error = None

    if request.method == 'POST':
        return prepare_email()


def prepare_email():
    email = {
        'email': request.form['email'],
        'subject': "Message from %s" % request.form['name'],
        'message': request.form['message']
    }
    if request.form['business']:
        email['subject'] = "(BUS) %s" % email['subject']

    if send_email(email):
        return jsonify(response="success?")


def send_email(email_dict):
    msg = MIMEText(email_dict['message'])
    msg['To'] = "CHANGE THIS TO A REAL ADDRESS"
    msg['From'] = "jsim.me : %s" % email_dict['email']
    msg['Subject'] = email_dict['subject']

    with SMTP('localhost') as smtp:
        return smtp.send_message(msg)
