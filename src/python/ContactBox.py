from flask import Flask, render_template, request, jsonify
from smtplib import SMTP
from email.mime.text import MIMEText
from subprocess import Popen, PIPE
import requests

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


@app.route('/recaptcha', methods=['POST'])
def validate_recaptcha():
    url = "https://www.google.com/recaptcha/api/siteverify"
    secret = "6LfX8gYUAAAAAG2D9qXU62anvibwX6XU1esTwQWI"

    r = requests.post(url=url, json={'secret': secret, 'response': request.form['response']})
    r.raise_for_status()

    if r.json()['success']:
        return jsonify(response="200")
    else:
        return jsonify(response="500")


def prepare_email():
    email = {
        'email': request.form['email'],
        'subject': "jsim: Message from %s" % request.form['name'],
        'message': request.form['message']
    }
    if request.form['business'] == 'true':
        email['subject'] = "(BUS) %s" % email['subject']

    if send_email(email):
        return jsonify(response="200")


def send_email(email_dict):
    msg = MIMEText(email_dict['message'])
    msg['To'] = "junniesim91@gmail.com"
    msg['From'] = email_dict['email']
    msg['Subject'] = email_dict['subject']
    return send_via_sendmail(msg)


def send_via_sendmail(msg):
    p = Popen(["usr/sbin/sendmail", "-t", "-oi"], stdin=PIPE)
    return p.communicate(msg.as_string())


def send_via_smtp(msg):
    with SMTP('localhost') as smtp:
        return smtp.send_message(msg)


if __name__ == "__main__":
    app.run()