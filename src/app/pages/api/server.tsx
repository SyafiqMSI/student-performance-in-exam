import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    gender: "", // Ubah menjadi string kosong atau nilai default yang sesuai
    ethnicGroup: "",
    parentEducation: "",
    lunchType: "",
    testPrep: "",
    parentMaritalStatus: "",
    isFirstChild: "",
    nrSiblings: "",
  });

  const [predictedPerformance, setPredictedPerformance] = useState<
    string | null
  >(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Mengubah nilai tipe data sesuai dengan yang diterima oleh evaluate performance
      const response = await axios.post("http://localhost:5000/api/submit", {
        gender: formData.gender,
        ethnicGroup: parseInt(formData.ethnicGroup), // Misalnya, ubah menjadi angka sesuai dengan kategori
        parentEducation: parseInt(formData.parentEducation),
        lunchType: parseInt(formData.lunchType),
        testPrep: parseInt(formData.testPrep),
        parentMaritalStatus: parseInt(formData.parentMaritalStatus),
        isFirstChild: parseInt(formData.isFirstChild),
        nrSiblings: parseInt(formData.nrSiblings),
      });

      setPredictedPerformance(response.data.performance_score);
    } catch (error) {
      console.error("There was an error making the request!", error);
    }
  };

  return (
    <div className="dashboard">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ethnicGroup">Ethnic Group:</label>
          <input
            type="text"
            id="ethnicGroup"
            name="ethnicGroup"
            value={formData.ethnicGroup}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="parentEducation">Parent Education:</label>
          <input
            type="text"
            id="parentEducation"
            name="parentEducation"
            value={formData.parentEducation}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lunchType">Lunch Type:</label>
          <input
            type="text"
            id="lunchType"
            name="lunchType"
            value={formData.lunchType}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="testPrep">Test Prep:</label>
          <input
            type="text"
            id="testPrep"
            name="testPrep"
            value={formData.testPrep}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="parentMaritalStatus">Parent Marital Status:</label>
          <input
            type="text"
            id="parentMaritalStatus"
            name="parentMaritalStatus"
            value={formData.parentMaritalStatus}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="isFirstChild">Is First Child:</label>
          <input
            type="text"
            id="isFirstChild"
            name="isFirstChild"
            value={formData.isFirstChild}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="nrSiblings">Number of Siblings:</label>
          <input
            type="text"
            id="nrSiblings"
            name="nrSiblings"
            value={formData.nrSiblings}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {predictedPerformance && (
        <div>
          <h2>Predicted Performance</h2>
          <p>{predictedPerformance}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
