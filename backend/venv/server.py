from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from skfuzzy import control as ctrl

# Define fuzzy variables and membership functions
gender = ctrl.Antecedent(np.arange(0, 2, 1), 'Gender')
race_ethnicity = ctrl.Antecedent(np.arange(0, 5, 1), 'EthnicGroup')
parental_education = ctrl.Antecedent(np.arange(0, 6, 1), 'ParentEduc')
lunch = ctrl.Antecedent(np.arange(0, 2, 1), 'LunchType')
test_prep = ctrl.Antecedent(np.arange(0, 2, 1), 'TestPrep')
parent_marital_status = ctrl.Antecedent(np.arange(0, 4, 1), 'ParentMaritalStatus')
isFirstChild = ctrl.Antecedent(np.arange(0, 2, 1), 'IsFirstChild')
nr_siblings = ctrl.Antecedent(np.arange(0, 8, 1), 'NrSiblings')
performance = ctrl.Consequent(np.arange(0, 101, 1), 'performance')

# Define membership functions for each variable
gender.automf(names=['male', 'female'])
race_ethnicity.automf(names=['group A', 'group B', 'group C', 'group D', 'group E'])
parental_education.automf(names=['some high school', 'high school', 'some college', 'associate degree', 'bachelor degree', 'master degree'])
lunch.automf(names=['standard', 'free/reduced'])
test_prep.automf(names=['none', 'completed'])
parent_marital_status.automf(names=['divorced', 'married', 'single', 'widowed'])
isFirstChild.automf(names=['yes', 'no'])
nr_siblings.automf(names=['0', '1', '2', '3', '4', '5', '6', '7'])
performance.automf(names=['poor', 'average', 'good'])

# Define rules
rules = [
    ctrl.Rule(lunch['standard'] & test_prep['none'] & race_ethnicity['group C'] & (parental_education['bachelor degree'] | parental_education['high school']), performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['none'] & race_ethnicity['group C'] & (parental_education['bachelor degree'] | parental_education['some college']), performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['none'] & race_ethnicity['group C'] & parental_education['master degree'] & gender['male'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['none'] & race_ethnicity['group C'] & parental_education['master degree'] & gender['female'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['none'] & race_ethnicity['group D'] & isFirstChild['yes'] & parental_education['some high school'], performance['average']),
    ctrl.Rule(lunch['standard'] & test_prep['none'] & race_ethnicity['group D'] & isFirstChild['yes'] & parental_education['high school'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['none'] & race_ethnicity['group D'] & isFirstChild['no'] & parent_marital_status['married'], performance['average']),
    ctrl.Rule(lunch['standard'] & test_prep['none'] & race_ethnicity['group D'] & isFirstChild['no'] & parent_marital_status['single'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'] & race_ethnicity['group B'] & parental_education['bachelor degree'] & gender['male'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'] & race_ethnicity['group B'] & parental_education['bachelor degree'] & gender['female'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'] & race_ethnicity['group B'] & parental_education['master degree'] & gender['male'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'] & race_ethnicity['group B'] & parental_education['master degree'] & gender['female'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'] & (race_ethnicity['group C'] | race_ethnicity['group C']) & gender['male'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'] & (race_ethnicity['group C'] | race_ethnicity['group C']) & gender['female'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'] & (race_ethnicity['group C'] | race_ethnicity['group D']) & nr_siblings['0'], performance['poor']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'] & (race_ethnicity['group C'] | race_ethnicity['group D']) & nr_siblings['1'], performance['poor']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'] & race_ethnicity['group B'] & parental_education['bachelor degree'] & gender['male'], performance['average']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'] & race_ethnicity['group B'] & parental_education['bachelor degree'] & gender['female'], performance['average']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'] & race_ethnicity['group B'] & parental_education['master degree'] & gender['male'], performance['average']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'] & race_ethnicity['group B'] & parental_education['master degree'] & gender['female'], performance['average']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'] & (race_ethnicity['group C'] | race_ethnicity['group D']) & gender['male'], performance['average']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'] & (race_ethnicity['group C'] | race_ethnicity['group D']) & gender['female'], performance['average']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'] & (race_ethnicity['group C'] | race_ethnicity['group D']) & nr_siblings['0'], performance['average']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'] & (race_ethnicity['group C'] | race_ethnicity['group D']) & nr_siblings['1'], performance['average']),
    # General rules
    ctrl.Rule(lunch['standard'] & test_prep['none'], performance['average']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['none'], performance['average']),
    ctrl.Rule(lunch['standard'] & test_prep['completed'], performance['good']),
    ctrl.Rule(lunch['free/reduced'] & test_prep['completed'], performance['good']),
]

# Create control system
performance_ctrl = ctrl.ControlSystem(rules)
performance_simulation = ctrl.ControlSystemSimulation(performance_ctrl)

def evaluate_performance(gender, ethnicGroup, parentEducation, lunchType, testPrep, parentMaritalStatus, isFirstChild, nrSiblings):
    print(f"Gender: {gender}, EthnicGroup: {ethnicGroup}, ParentEduc: {parentEducation}, LunchType: {lunchType}, TestPrep: {testPrep}, ParentMaritalStatus: {parentMaritalStatus}, IsFirstChild: {isFirstChild}, NrSiblings: {nrSiblings}")
    performance_simulation.input['Gender'] = gender
    performance_simulation.input['EthnicGroup'] = ethnicGroup
    performance_simulation.input['ParentEduc'] = parentEducation
    performance_simulation.input['LunchType'] = lunchType
    performance_simulation.input['TestPrep'] = testPrep
    performance_simulation.input['ParentMaritalStatus'] = parentMaritalStatus
    performance_simulation.input['IsFirstChild'] = isFirstChild
    performance_simulation.input['NrSiblings'] = nrSiblings
    
    try:
        performance_simulation.compute()
        return performance_simulation.output['performance']
    except ValueError as e:
        print(f"Error during computation: {e}")
        return None

# Define Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Mapping dictionaries
gender_map = {'female': 1, 'male': 0}
ethnicGroup_map = {'group A': 0, 'group B': 1, 'group C': 2, 'group D': 3, 'group E': 4}
parentEducation_map = {
    'some high school': 0,
    'high school': 1,
    'some college': 2,
    'associate degree': 3,
    'bachelor degree': 4,
    'master degree': 5
}
lunchType_map = {'standard': 0, 'free/reduced': 1}
testPrep_map = {'none': 0, 'completed': 1}
parentMaritalStatus_map = {'divorced': 0, 'married': 1, 'single': 2, 'widowed': 3}
isFirstChild_map = {'yes': 0, 'no': 1}
nrSiblings_map = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7}

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST')
    return response

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.json
    gender = gender_map[data['gender']]
    ethnicGroup = ethnicGroup_map[data['ethnicGroup']]
    parentEducation = parentEducation_map[data['parentEducation']]
    lunchType = lunchType_map[data['lunchType']]
    testPrep = testPrep_map[data['testPrep']]
    parentMaritalStatus = parentMaritalStatus_map[data['parentMaritalStatus']]
    isFirstChild = isFirstChild_map[data['isFirstChild']]
    nrSiblings = nrSiblings_map[data['nrSiblings']]
    
    result = evaluate_performance(gender, ethnicGroup, parentEducation, lunchType, testPrep, parentMaritalStatus, isFirstChild, nrSiblings)

    if result is None:
        return jsonify({'status': 'error', 'message': 'Error during fuzzy computation'}), 500
    
    return jsonify({'predictedPerformance': result})


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)









# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Aktifkan CORS untuk semua rute

# @app.route('/api/submit', methods=['POST'])
# def submit_data():
#     data = request.get_json()

#     # Lakukan apa pun yang diperlukan dengan data yang diterima
#     print("Data yang diterima:", data)

#     return jsonify({'status': 'success'})

# if __name__ == '__main__':
#     app.run(debug=True)

