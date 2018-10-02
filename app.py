#dependencies
import os
from flask import Flask
from flask import jsonify
from flask import request, redirect
from flask import render_template


from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine



#-------------------------------------------


#instantiate flask app
app = Flask(__name__)



#create engine object based on URL
engine = create_engine("sqlite:///Car-Price-Data/Craiglist.db", connect_args={'check_same_thread': False}, echo=True)

#reflect database
Base = automap_base()

#reflect the database's tables
Base.prepare(engine, reflect=True)

#create session from Python to the database
session = Session(bind=engine)


#create mapped class for database
Craiglist_Car = Base.classes.Craiglist_Car





#---------------------------------------------


@app.route("/")
def homepage():
    return render_template("index.html")


#api call route
@app.route("/api/<choice>")
def carMake(choice):
    
    chosen = choice.title()
    
    #manipulate string to query correct rows 
    
    #query for data by model
    result = session.query(Craiglist_Car).filter(Craiglist_Car.Model == chosen).all()

    carResultList = []

    count = 1

    #loop through table queries and create dictionary
    for row in result:

        dictionary = {"Result_Number": count, "Post_Title": row.Title, "Make": row.Make, "Model": row.Model, "Year": row.Year, "Condition": row.Condition, 
                       "Cylinder": row.Cylinders, "Drive": row.Drive, "Fuel": row.Fuel, "Odometer": row.Odometer, "Color": row.Paint_color,
                       "Size": row.Size, "Title_Status": row.Title_status, "Transmission": row.Transmission, "Type": row.Type,
                    "VIN": row.VIN, "Post_Link": row.Link, "Price": row.Price}
        
        count+=1

        carResultList.append(dictionary)


    return jsonify(carResultList)


if __name__ == "__main__":
    app.run(debug=True)