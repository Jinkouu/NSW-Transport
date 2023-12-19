import requests
from io import BytesIO
import zipfile
import os
import csv
from flask import Flask, render_template

url = "https://api.transport.nsw.gov.au/v1/publictransport/timetables/complete/gtfs"

def getApiKey():
    with open("key.txt") as input:
        apiKey = input.readline().strip()
        headers = {
            "Authorization": "apikey " + apiKey,
        }
        return headers

def downloadFiles(headers):
    response = requests.get(url, headers=headers)

    if response.ok:
        # Convert the response content to a BytesIO object
        zip_bytes = BytesIO(response.content)

        # Extract files from the ZIP
        with zipfile.ZipFile(zip_bytes, "r") as zip_file:
            # Access files within the ZIP
            for file_info in zip_file.infolist():
                print(f"File: {file_info.filename}")

                # Extract the file content
                file_content = zip_file.read(file_info.filename)

                # Process the file content as needed
                # For example, you can save it to disk
                with open("gtfs/" + file_info.filename, "wb") as output_file:
                    output_file.write(file_content)
    else:
        print(f"Request failed with status: {response.status_code}")

def fileCount(folderPath):
    try:
        files = os.listdir(folderPath)
        fileCount = len([f for f in files if os.path.isfile(os.path.join(folderPath, f))])
        return fileCount
    except FileNotFoundError:
        print(f"The folder '{folderPath}' does not exist.")
        return None

def initialise():
    if fileCount("gtfs") != 11:
        apiKey = getApiKey()
        downloadFiles(apiKey)
    else:
        print("all good") 

#start = "Cabramatta Station"
#end = "Central Station"
#
#def findRoutes(start, end):
#    stops = []
#    with open("gtfs\\stops.txt") as input:
#        for lines in input:
#            lines = lines.strip().split(',')
#            stops.append(lines)
    
application = Flask(__name__)

@application.route('/')
def index():
    initialise()
    return render_template('index.html')

if __name__ =="__main__":
    application.run(debug=True)

#initialise()
#findRoutes(start, end)
