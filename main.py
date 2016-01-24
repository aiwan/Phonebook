#!/usr/bin/env python
# -*- coding: utf-8 -*-

### Andres Iwan ###

# Phonebook:
# 1- Add records
# 2- Fetch records
# 3- Exit
#
# Creates new files for each record and a backup. If a record file is deleted, the backup detects it and create a new one.

from bottle import route, run, template, static_file, get, post, request
import json
import re
from sys import argv

from app import create_user_count_file, update_user_count, create_record, fetch_records, check_backup_records
from util import check_file_existence, get_user_input, print_list, create_file, read_from_file, write_in_file
import sys

from util import get_user_information


#################################################################
######################## DECORATORS #############################
#################################################################

@get('/')
def index():
    return template("index.html")

@post("/user_input")
def user_input():
    user_input = {}
    user_input['phone_number'] = request.forms.get('phoneNumber')
    user_input['name'] = request.forms.get('name')
    user_input['last_name'] = request.forms.get('lastName')
    user_input['address'] = request.forms.get('address')
    user_input['email'] = request.forms.get('email')
    user_input['country'] = request.forms.get('country')
    user_input['city'] = request.forms.get('city')
    record_to_match = request.forms.get('recordToMatch')
    response = main(user_input, record_to_match)
    print response
    return json.dumps(response)

#################################################################
######################## MAIN ###################################
#################################################################

def main(user_input, record_to_match):
    # If backup doesn't exist, create backup file
    backup_file_name = 'backup.txt'
    if not check_file_existence(backup_file_name):
        create_file(backup_file_name)
        # Create list in backup for a better processing
        backup_list = []
        write_in_file(backup_file_name, backup_list)
    else:
        # Check if all the backup records have an independent file
        backup_content = read_from_file(backup_file_name)
        check_backup_records()

    # Create a 'user count file = us_count.txt' if it doesn't exist to create new files with the next user number
    user_count_file_name = 'us_count.txt'
    if not check_file_existence(user_count_file_name):
        create_user_count_file(user_count_file_name)
    # Main menu

    # Execute user choice
    # 1- Add records
    # 2- Fetch records

    user_choice = ''
    for key in user_input:
        if user_input[key] != None:
            user_choice = '1'
        else:
            user_choice = '2'

    if (user_choice == '1'):
        #Update user count
        user_count = update_user_count(user_count_file_name)
        # Create a new record with the input from the user
        create_record(user_input, user_count, 'new_info', '')

    elif (user_choice == '2'):
        # Fetch records
        users_matching_field_record = fetch_records(record_to_match)
        # Print to user
        if len(users_matching_field_record) > 0:
            return users_matching_field_record
        else:
            return 'No records found'

#################################################################
########################## FILES ################################
#################################################################

@get('/js/<filename:re:.*\.js>')
def javascripts(filename):
    return static_file(filename, root='js')

@get('/css/<filename:re:.*\.css>')
def stylesheets(filename):
    return static_file(filename, root='css')

run(host='localhost', port=7000)

# run(host='0.0.0.0', port=argv[1])





