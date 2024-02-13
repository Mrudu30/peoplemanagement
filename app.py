from flask import Flask,redirect,url_for,render_template,request,jsonify,session
from module import database
import json

app=Flask(__name__)
app.secret_key = 'thefourthwall'
db = database.Database()
au = database.Authentication()

# ---------- Main Home Page ------------
@app.route('/home',methods=['GET','POST'])
def home():
    if request.method=='POST':
        return render_template('index.html')

    return render_template('index.html')

# ---------- Render all People -----------
@app.route("/getpeople", methods=['POST'])
def getPeople():
    data = request.form
    try:
        people_data = db.getPeople(data['id'])
        # print(people_data)
        if people_data:
            # print('datagiven')
            return jsonify(people_data)
        else:
            return jsonify({"error": "An error occurred while retrieving people data"})
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred while retrieving people data"})

# ----------- Duplicate Email Check -------------
@app.route("/emailCheck",methods=['POST'])
def emailCheck():
    data = request.form
    print(data)
    try:
        if db.emailcheck(data) == True:
            message = "Email Taken"
            return jsonify({'status': False, 'message': message})
        else:
            message = "New email"
            return jsonify({'status': True, 'message': message})
    except Exception as e:
        print(e)
        return jsonify({'status': False, 'message': 'An error occurred'})

# ----------- Search Filter Function -------------
@app.route("/searchFilter",methods=['POST'])
def searchFilter():
    # print(request.form)
    data = request.form
    if data:
        filterdata = db.searchFilter(data=data)
        return jsonify(filterdata)
    else:
        return 'no data found'

# ----------- Add Info of New People -------------
@app.route("/addperson",methods=['GET','POST'])
def addPerson():
    data = request.form
    hobb = request.form.getlist('hobby')
    hobb_str = ','.join(hobb)
    print(data,hobb_str)
    if db.addPerson(data,hobb_str):
        message = 'New Person Added'
        return message
    else:
        message = 'Some Error Occured'
        return message

# ------------ Update Person Info -------------
@app.route("/updateperson",methods = ['GET','POST'])
def updatePerson():
    if request.method == 'POST':
        data = request.form
        hobb = request.form.getlist('hobby')
        hobb_str = ','.join(hobb)
        # print(data,hobb_str)
        if db.updatePerson(data=data,hobb_str=hobb_str):
            message = "Person Updated"
            return message
        else:
            message = "Person Not Updated"
            return message

# ------------- Update Status From Home Page -------------
@app.route("/updateStatus",methods=['POST','GET'])
def updateStatus():
    data = request.form
    # print(data)
    if db.updateStatus(data):
        message = 'Status Updated'
        return message
    else:
        message = 'Status Not Updated'
        return message

# ------------- Delete Person Info -------------
@app.route('/deletePerson', methods=['POST'])
def deletePerson():
    user_id = request.form.get('id')
    db.deleteUser(user_id)
    message ="user deleted successfully"
    return message

# -------------- Login -----------------
@app.route("/",methods=['GET','POST'])
def loginPerson():

    if request.method == 'POST':
        print(request.form)
        data = request.form
        # mail = request.form.get('email')
        # print(mail)
        reply = au.authenticate(data)
        if reply[0] == True:
            # session['user'] = mail
            # print('session start')
            return json.dumps({'status':'success','message':reply[1]})
        else:
            return json.dumps({'status':'error','message':reply[1]})

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('loginPerson'))


if __name__ == '__main__':
    #DEBUG is SET to TRUE. CHANGE FOR PROD
    app.run(port=1102,debug=True)