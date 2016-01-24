from util import get_user_information, create_file, write_in_file, read_from_file, get_all_user_txt_files, append_in_file

def create_user_count_file(file_name):
    create_file(file_name)
    number_of_users = 0
    write_in_file(file_name, number_of_users)

def update_user_count(file_name):
    user_count = read_from_file(file_name)
    user_count += 1
    write_in_file(file_name, user_count)
    return user_count

def create_record (user_information, user_count, type_of_info, info):
    # new_info: get info from the user
    # given_info: info from backup file (or elsewhere)
    if type_of_info == 'new_info':
        user_information = user_information
    elif type_of_info == 'given_info':
        user_information = info
    else:
        print 'Invalid type of info'

    # Create file for new user
    new_user_file = 'user%s.txt' % (user_count)
    create_file(new_user_file)
    # Write user info in the file
    write_in_file(new_user_file, user_information)

    # If new_info --> create new user file
    if type_of_info == 'new_info':
        #Append to backup
        backup_list = read_from_file('backup.txt')
        backup_list.append(user_information)
        append_in_file('backup.txt', backup_list)

def fetch_records (record):
    # Get all files
    all_user_files = get_all_user_txt_files()

    # Filter by field record
    users_matching_record_info = []
    for file in all_user_files:
        user_info = read_from_file(file)
        for key in user_info:
            if user_info[key].lower() == record.lower():
                users_matching_record_info.append(user_info)
    return users_matching_record_info

def check_backup_records():
    backup_list = read_from_file('backup.txt')
    all_user_files = get_all_user_txt_files()
    for record in backup_list:
        exists = False
        for user_file in all_user_files:
            user = read_from_file(user_file)
            if user == record:
                exists = True
                break
        if exists == False:
            user_count = update_user_count('us_count.txt')
            create_record('', user_count, 'given_info', record)