from sklearn import tree
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn import preprocessing 
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import cross_val_score

# Memuat file CSV
file_path = 'Expanded_data_with_more_features.csv'  # Perbarui jalur sesuai kebutuhan
students_data = pd.read_csv(file_path)

# Menghapus baris dengan sel kosong
cleaned_df = students_data.dropna(how='any')

# Menampilkan DataFrame yang sudah dibersihkan
print("\nDataFrame yang Dibersihkan (baris dengan sel kosong dihapus):")
print(cleaned_df)

# Instal openpyxl jika belum terinstal
try:
    import openpyxl
except ImportError:
    import os
    os.system('pip install openpyxl')

# Menyimpan DataFrame yang sudah dibersihkan ke file Excel
cleaned_file_path = 'cleaned_excel_file.xlsx'
cleaned_df.to_excel(cleaned_file_path, index=False)
print(f"\nData yang sudah dibersihkan telah disimpan ke {cleaned_file_path}")

# Pilih fitur yang relevan untuk decision tree
features = ['Gender', 'EthnicGroup', 'ParentEduc', 
            'LunchType', 'TestPrep', 'ParentMaritalStatus', 
            'PracticeSport', 'IsFirstChild', 'NrSiblings', 
            'TransportMeans', 'WklyStudyHours']
target = 'status'

# Buat salinan data untuk diproses
data = cleaned_df[features + [target]].copy()

# Encode variabel kategori
label_encoders = {}
for column in features:
    le = preprocessing.LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

# Encode variabel target
target_encoder = preprocessing.LabelEncoder()
data[target] = target_encoder.fit_transform(data[target])

# Pisahkan fitur dan target
X = data[features]
y = data[target]

# Tentukan rentang untuk max_depth
depth_range = range(1, 21)

# Placeholder untuk skor
cross_val_scores = []

# Lakukan cross-validation untuk setiap depth
for depth in depth_range:
    tree = DecisionTreeClassifier(max_depth=depth, random_state=42)
    scores = cross_val_score(tree, X, y, cv=5)  # 5-fold cross-validation
    cross_val_scores.append(scores.mean())

# Plot hasil cross-validation
plt.plot(depth_range, cross_val_scores)
plt.xlabel('max_depth')
plt.ylabel('Cross-Validation Accuracy')
plt.title('Finding Optimal max_depth')
plt.grid(True)
plt.show()

# Evaluasi random states
optimal_depth = 5
random_states = [0, 21, 42, 63, 84]
for state in random_states:
    tree = DecisionTreeClassifier(max_depth=optimal_depth, random_state=state)
    scores = cross_val_score(tree, X, y, cv=5)
    print(f'Random State: {state}, Cross-Validation Score: {scores.mean()}')

# Latih model decision tree
random_state = 42
decision_tree = DecisionTreeClassifier(max_depth=optimal_depth, random_state=random_state)
decision_tree.fit(X, y)

# Plot decision tree
plt.figure(figsize=(20,10))
plot_tree(decision_tree, feature_names=features, class_names=target_encoder.classes_, filled=True, rounded=True, fontsize=12)
plt.title("Decision Tree for Student Performance")
plt.show()

# Instal dtreeviz jika belum terinstal
# !pip install dtreeviz graphviz

import dtreeviz
from dtreeviz import model as dtreeviz_model

# Buat visualisasi dtreeviz
viz = dtreeviz_model(
    decision_tree,       # Model decision tree
    X,                   # Matriks fitur
    y,                   # Vektor target
    feature_names=features,       # Daftar nama fitur
    class_names=list(target_encoder.classes_),  # Daftar nama kelas target
    target_name='Student Performance'  # Nama variabel target
)

# Tampilkan visualisasi
viz.view()

# Ekstrak pohon ke aturan
from sklearn.tree import _tree

def tree_to_rules(tree, feature_names, target_names):
    tree_ = tree.tree_
    feature_name = [
        feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
        for i in tree_.feature
    ]

    rules = []
    count_rules = 0  # Variabel untuk menghitung jumlah aturan
    
    def recurse(node, depth, conditions):
        nonlocal count_rules
        if tree_.feature[node] != _tree.TREE_UNDEFINED:
            name = feature_name[node]
            threshold = tree_.threshold[node]
            
            # Cabang kiri (<= threshold)
            new_conditions_left = conditions + ["{} <= {}".format(name, threshold)]
            recurse(tree_.children_left[node], depth + 1, new_conditions_left)
            
            # Cabang kanan (> threshold)
            new_conditions_right = conditions + ["{} > {}".format(name, threshold)]
            recurse(tree_.children_right[node], depth + 1, new_conditions_right)
        else:
            # Dapatkan kelas target
            target = tree_.value[node].argmax()
            rule = " & ".join(conditions)
            rules.append(f"ctrl.Rule({rule}, {target_names[target]})")
            count_rules += 1 

    recurse(0, 1, [])
    
    return rules, count_rules

target_names = ['performance["poor"]', 'performance["average"]', 'performance["good"]']

rulesCode, num_rules = tree_to_rules(decision_tree, features, target_names)

print(f"Number of rules generated: {num_rules}")
for rule in rulesCode:
    print(rule)

# Fuzzy logic
# Instal scikit-fuzzy jika belum terinstal
# !pip install -U scikit-fuzzy

import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# Definisikan variabel fuzzy dan fungsi keanggotaannya
gender = ctrl.Antecedent(np.arange(0, 2, 1), 'Gender')
race_ethnicity = ctrl.Antecedent(np.arange(0, 5, 1), 'EthnicGroup')
parental_education = ctrl.Antecedent(np.arange(0, 6, 1), 'ParentEduc')
lunch = ctrl.Antecedent(np.arange(0, 2, 1), 'LunchType')
test_prep = ctrl.Antecedent(np.arange(0, 2, 1), 'TestPrep')
parent_marital_status = ctrl.Antecedent(np.arange(0, 4, 1), 'ParentMaritalStatus')
practice_sport = ctrl.Antecedent(np.arange(0, 3, 1), 'PracticeSport')
isFirstChild = ctrl.Antecedent(np.arange(0, 2, 1), 'IsFirstChild')
nr_siblings = ctrl.Antecedent(np.arange(0, 8, 1), 'NrSiblings')
transport_means = ctrl.Antecedent(np.arange(0, 2, 1), 'TransportMeans')
wkly_study_hours = ctrl.Antecedent(np.arange(0, 4, 1), 'WklyStudyHours')
performance = ctrl.Consequent(np.arange(0, 101, 1), 'performance')

# Definisikan fungsi keanggotaan untuk setiap variabel
gender.automf(names=['male', 'female'])

race_ethnicity.automf(names=['group A', 'group B', 'group C', 'group D', 'group E'])

parental_education.automf(names=['some high school', 'high school', 'some college', 'associate degree', 'bachelor degree', 'master degree'])

lunch.automf(names=['standard', 'free/reduced'])

test_prep.automf(names=['none', 'completed'])

parent_marital_status.automf(names=['divorced', 'married', 'single', 'widowed'])

practice_sport.automf(names=['never', 'sometimes', 'regularly'])

isFirstChild.automf(names=['yes', 'no'])

nr_siblings.automf(names=['0', '1', '2', '3', '4', '5', '6', '7'])

transport_means.automf(names=['private', 'school_bus'])

wkly_study_hours.automf(names=['< 5', '5-10', '> 10'])

performance.automf(names=['poor', 'average', 'good'])

# Konversi aturan pohon keputusan ke aturan fuzzy
conditions_mapping = {
    'Gender <= 0.5': 'gender["male"]',
    'Gender > 0.5': 'gender["female"]',
    'EthnicGroup <= 0.5': 'race_ethnicity["group A"]',
    'EthnicGroup > 0.5': 'race_ethnicity["group B"]',
    'ParentEduc <= 0.5': 'parental_education["some high school"]',
    'ParentEduc > 0.5': 'parental_education["high school"]',
    'LunchType <= 0.5': 'lunch["standard"]',
    'LunchType > 0.5': 'lunch["free/reduced"]',
    'TestPrep <= 0.5': 'test_prep["none"]',
    'TestPrep > 0.5': 'test_prep["completed"]',
    'ParentMaritalStatus <= 0.5': 'parent_marital_status["divorced"]',
    'ParentMaritalStatus > 0.5': 'parent_marital_status["married"]',
    'PracticeSport <= 0.5': 'practice_sport["never"]',
    'PracticeSport > 0.5': 'practice_sport["sometimes"]',
    'IsFirstChild <= 0.5': 'isFirstChild["yes"]',
    'IsFirstChild > 0.5': 'isFirstChild["no"]',
    'NrSiblings <= 0.5': 'nr_siblings["0"]',
    'NrSiblings > 0.5': 'nr_siblings["1"]',
    'TransportMeans <= 0.5': 'transport_means["private"]',
    'TransportMeans > 0.5': 'transport_means["school_bus"]',
    'WklyStudyHours <= 0.5': 'wkly_study_hours["< 5"]',
    'WklyStudyHours > 0.5': 'wkly_study_hours["5-10"]',
}

fuzzy_rules = []
for rule in rulesCode:
    for cond, fuzzy_cond in conditions_mapping.items():
        rule = rule.replace(cond, fuzzy_cond)
    fuzzy_rules.append(rule)

for rule in fuzzy_rules:
    print(rule)


# Create a control system and simulation
performance_ctrl = ctrl.ControlSystem(fuzzy_rules)
performance_sim = ctrl.ControlSystemSimulation(performance_ctrl)

# Simulate and visualize performance
performance_sim.input['Gender'] = 1  # female
performance_sim.input['EthnicGroup'] = 3  # group D
performance_sim.input['ParentEduc'] = 4  # bachelor degree
performance_sim.input['LunchType'] = 1  # free/reduced
performance_sim.input['TestPrep'] = 1  # completed
performance_sim.input['ParentMaritalStatus'] = 1  # married
performance_sim.input['PracticeSport'] = 2  # regularly
performance_sim.input['IsFirstChild'] = 1  # no
performance_sim.input['NrSiblings'] = 2  # 2
performance_sim.input['TransportMeans'] = 1  # school_bus
performance_sim.input['WklyStudyHours'] = 2  # > 10

# Compute the performance
performance_sim.compute()

# Print the result
print("\nPredicted performance: {:.2f}".format(performance_sim.output['performance']))

# Visualize the result
performance.view(sim=performance_sim)
