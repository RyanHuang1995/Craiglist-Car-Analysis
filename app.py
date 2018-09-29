#dependencies
import os
from flask import Flask
from flask import jsonify
from flask import request
from flask import make_response
from flask import url_for
from flask import render_template

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pymysql

pymysql.install_as_MySQLdb()


#-------------------------------------------


#instantiate flask app
app = Flask(__name__)




#create engine object based on URL
engine = create_engine("sqlite:///Car-Price-Data/Craiglist.db")

#reflect database
Base = automap_base()

#reflect the database's tables
Base.prepare(engine, reflect=True)

#create session from Python to the database
session = Session(bind=engine)


#create mapped class for database
Craiglist_Car = Base.classes.Craiglist_Car


#---------------------------------------------

#routes 
@app.route("/")
def home():
    return render_template("index.html")



#route to retrieve car model data
@app.route("/api/<choice>")
def make(choice):
    
    #test
    chosen = choice.title()
    
    #manipulate string to query correct rows 
    
    #query for data by model
    result = session.query(Craiglist_Car).filter(Craiglist_Car.model == chosen).all()

    carResultList = []

    #loop through table queries and create dictionary
    for row in result:
        count = 1

    
        dictionary = {"Result_Number": count, "Post_Title": row.title, "Make": row.make, "Model": row.model, "Year": row.year, "Condition": row.condition, 
                       "Cyclinder": row.cylinders, "Drive": row.drive, "Fuel": row.fuel, "Odometer": row.odometer, "Color": row.paint_color,
                       "Size": row.size, "Title_Status": row.title_status, "Transmission": row.transmission, "Type": row.type,
                       "Price": row.price, "VIN": row.VIN, "Post_Link": row.link}
        
        count+=1

        carResultList.append(dictionary)

    return jsonify(carResultList)


if __name__ == "__main__":
    app.run(debug=True)