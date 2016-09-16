from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    error = None
    return render_template('index.html')


@app.route('/contactme', methods=['POST'])
def process_message():
    error = None

    if request.method == 'POST':
        return message_posted()


def message_posted():
    sender = request.form['name']
    email = request.form['email']
    business = request.form['business']
    msg = request.form['message']

    return jsonify(response="success?")

