import pymysql as p

class Database:
    def connect(self):
        return p.connect(host="localhost",user="root",password="",database="usermanagement",charset="utf8mb4")

    def getPeople(self,id):
        conn = Database.connect(self)
        cur = conn.cursor()

        try:
            if id=="":
                query=f'SELECT * FROM people'
                cur.execute(query)
                return cur.fetchall()
            else:
                query=f'SELECT * FROM people WHERE id=%s'
                values = (id,)
                cur.execute(query,values)
                return cur.fetchone()
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    def addPerson(self,data,hobb_str):
        conn = Database.connect(self)
        cur = conn.cursor()
        try:
            if data['statusSwitch'] =='on':
                statusval = 'Active'
        except:
            statusval = 'Inactive'

        try:
            query = f"INSERT INTO people (fname,lname,email,mobno,gender,hobbies,country,address,status) values (%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            values = (data['fname'],data['lname'],data['email'],data['mobno'],data['gender'],hobb_str,data['country'],data['address'],statusval)
            # print(cur.mogrify(query,values))
            cur.execute(query,values)
            conn.commit()
            return True
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    def updatePerson(self,data,hobb_str):
        conn = Database.connect(self)
        cur = conn.cursor()

        try:
            query = f"UPDATE people SET fname=%s, lname=%s, email=%s, mobno=%s, gender=%s, hobbies=%s, country=%s, address=%s, status=%s WHERE id=%s"
            values = (data['fname'], data['lname'], data['email'], data['mobno'], data['gender'],hobb_str,data['country'],data['address'],data['status'],data['id'])
            # print(cur.mogrify(query,values))
            cur.execute(query,values)
            conn.commit()
            return True
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    def updateStatus(self,data):
        conn = Database.connect(self)
        cur = conn.cursor()

        try:
            query = f'UPDATE people SET status=%s WHERE id=%s'
            values = (data['status'],int(data['id']))
            # print(cur.mogrify(query,values))
            cur.execute(query,values)
            conn.commit()
            return True
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    def deleteUser(self,id):
        conn = Database.connect(self)
        cur = conn.cursor()

        try:
            query = f'DELETE FROM people WHERE id=%s'
            values = (id)
            # print(cur.mogrify(query,values))
            cur.execute(query,values)
            conn.commit()
            return True
        except:
            conn.rollback()
            return False
        finally:
            conn.close()

    def searchFilter(self,data):
        conn = Database.connect(self)
        cur = conn.cursor()

        search = data['searchtxt']
        attribute = data['attribute']
        order = data['filter-order']

        try:
            query = f"SELECT * FROM people"
            if search != '':
                query += f" WHERE fname LIKE '%{search}%' OR lname LIKE '%{search}%' OR email LIKE '%{search}%'"

            if attribute != "":
                query += f' ORDER BY {attribute} {order}'
            else:
                query += f' ORDER BY id {order}'
            # print(query)

            cur.execute(query)
            return cur.fetchall()
        except:
            conn.rollback()
            return False
        finally:
            conn.close()