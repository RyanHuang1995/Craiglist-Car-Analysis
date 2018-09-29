from flask import Flask, render_template, jsonify 
import os
import pandas as pd
import sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///dbsqlite"



Base = automap_base()

Base.prepare(db.engine, reflect=True)


@app.route("/")
def index():
    render_template("index.html")


@app.route("/accord")
def accord():
    return jsonify(accordData)

@app.route("/civic")
def civic():
    return jsonify(civicData)

@app.route("/camry")
def camry():
    return jsonify(camryData)

@app.route("altima")
def altima():
    return jsonify(altimaData)

@app.route("prius")
def prius():
    return jsonify(priusData)

@app.route("corolla")
def corolla():
    return jsonify(corollaData)
