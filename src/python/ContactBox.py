from flask import Flask, render_template, request, jsonify
from smtplib import SMTP
from email.mime.text import MIMEText
from subprocess import Popen, PIPE

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
