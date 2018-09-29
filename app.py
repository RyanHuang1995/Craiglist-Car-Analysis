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



#----------------------------
# routes

@app.route("/")
def index():
    render_template("index.html")


#route to retrieve model data
@app.route("/<choice>")
def make(choice):
    
    #test
    #choice = "ACCORD"
    
    #create list 
    title = []
    make = []
    model = []
    year = []
    condition = []
    cylinders = []
    drive = []
    fuel = []
    odometer = []
    color = []
    size = []
    title_status = []
    transmission = []
    typeList = []
    price = []
    vin = []
    link = []
    
    #manipulate string to query correct rows 
    choice = choice.title()
    
    #query for data by model
    result = session.query(Craiglist_Car).filter(Craiglist_Car.model == choice).all()

    #loop through table queries and create dictionary
    for row in result:
        title.append(row.title)
        make.append(row.make)
        model.append(row.model)
        year.append(row.year)
        condition.append(row.condition)
        cylinders.append(row.cylinders)
        drive.append(row.drive)
        fuel.append(row.fuel)
        odometer.append(row.odometer)
        color.append(row.paint_color)
        size.append(row.size)
        title_status.append(row.title_status)
        transmission.append(row.transmission)
        typeList.append(row.type)
        price.append(row.price)
        vin.append(row.VIN)
        link.append(row.link)
    
        AccordDict = {"PostTitle": title, "Make": make, "Model": model, "Year": year, "Condition": condition, 
                       "Cyclinder": cylinders, "Drive": drive, "Fuel": fuel, "Odometer": odometer, "Color": color,
                       "Size": size, "TitleStatus": title_status, "Transmission": transmission, "Type": typeList,
                       "Price": price, "VIN": vin, "PostLink": link}

    return jsonify(AccordDict)