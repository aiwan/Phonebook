import pickle
from os import listdir, path

def get_user_input (input_message):
    return raw_input(input_message).strip()

def get_user_information():
    user_input = {}
    user_input['phone_number'] = get_user_input('Enter your phone number: ')
    user_input['name'] = get_user_input('Enter your name: ')
    user_input['last_name'] = get_user_input('Enter your last name: ')
    user_input['address'] = get_user_input('Enter your address: ')
    user_input['email'] = get_user_input('Enter your email: ')
    user_input['country'] = get_user_input('Enter your country: ')
    user_input['city'] = get_user_input('Enter your city: ')
    return user_input

def create_file(user_file_name):
    file_name = user_file_name
    f = open(file_name, 'a')
    f.close()

def write_in_file(file_name, information):
    f = open(file_name, 'w')
    pickle.dump(information, f)
    f.close()

def append_in_file(file_name, information):
    f = open(file_name, 'w')
    pickle.dump(information, f)
    f.close()

def read_from_file(file_name):
    f = open(file_name, 'r')
    information = pickle.load(f)
    f.close()
    return information

# Check file_name existence in the Phonebook directory
def check_file_existence(file_name):
    path_to_this_file = path.realpath(__file__)
    path_only = path.dirname(path_to_this_file)
    # create a list of only files and directories in the current dir
    only_files = [f for f in listdir(path_only) if path.isfile(path.join(path_only, f))]
    for files in only_files:
        if file_name in files:
            return True
    return False

def get_all_user_txt_files():
    path_to_this_file = path.realpath(__file__)
    path_only = path.dirname(path_to_this_file)
    # create a list of only files and directories in the current dir
    only_files = [f for f in listdir(path_only) if path.isfile(path.join(path_only, f))]

    #Only files that contain user and .txt
    files_with_user_and_txt_ext = []
    for file in only_files:
        if 'user' in file:
            if '.txt' in file:
                files_with_user_and_txt_ext.append(file)
    return files_with_user_and_txt_ext

def print_list(my_list):
    for item in my_list:
        print item



