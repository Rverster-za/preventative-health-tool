import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PreventativeHealthForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    aboriginalOrTorresStrait: false,
    smoker: false,
    familyHistoryCancer: false,
    diabetes: false,
    hypertension: false,
    highCholesterol: false,
    sexuallyActive: false,
    newPartner: false
  });

  const [recommendations, setRecommendations] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateRecommendations = () => {
    const recs = {
      screening: [],
      vaccinations: [],
      lifestyle: []
    };

    const numericAge = parseInt(formData.age);

    // Age-based vaccinations
    if (numericAge >= 65) {
      recs.vaccinations.push({
        title: 'Annual Flu Vaccine',
        frequency: 'Typically offered yearly',
        details: 'Free under National Immunisation Program - discuss with your doctor',
        rationale: 'People over 65 may benefit from this vaccination'
      });
      recs.vaccinations.push({
        title: 'Pneumococcal Vaccine',
        frequency: 'Schedule varies',
        details: 'Free for adults 65+ - discuss timing with your doctor',
        rationale: 'Recommended to discuss for this age group'
      });
      recs.vaccinations.push({
        title: 'Shingles Vaccine',
        frequency: 'One-time',
        details: 'Free for 65-79 years - discuss with your doctor',
        rationale: 'You may be eligible for this vaccination'
      });
    }

    // General health checks
    if (numericAge >= 45) {
      recs.screening.push({
        title: 'Heart Health Check',
        frequency: 'Usually every 2 years',
        details: 'Blood pressure, cholesterol, diabetes risk - discuss with your doctor',
        rationale: 'Early detection can prevent cardiovascular disease'
      });
    }

    // Bowel cancer screening
    if (numericAge >= 50 && numericAge <= 74) {
      recs.screening.push({
        title: 'Bowel Cancer Screening',
        frequency: 'Usually every 2 years',
        details: 'Through National Program - discuss with your doctor',
        rationale: 'Available for this age group - ask about your eligibility'
      });
    }

    // Gender-specific screenings
    if (formData.gender === 'female') {
      if (numericAge >= 50 && numericAge <= 74) {
        recs.screening.push({
          title: 'Breast Cancer Screening',
          frequency: 'Typically every 2 years',
          details: 'Through BreastScreen Australia - discuss with your doctor',
          rationale: 'Available for women in this age range'
        });
      }
      if (numericAge >= 25 && numericAge <= 74) {
        recs.screening.push({
          title: 'Cervical Screening',
          frequency: 'Usually every 5 years',
          details: 'HPV-based test - discuss timing with your doctor',
          rationale: 'Recommended for women in this age range'
        });
      }
    }

    // Male-specific screenings
    if (formData.gender === 'male') {
      if (numericAge >= 50 && numericAge <= 69) {
        recs.screening.push({
          title: 'Prostate Cancer Discussion',
          frequency: 'Timing varies by individual',
          details: 'PSA testing - discuss options with your doctor',
          rationale: 'Consider discussing the pros and cons of screening'
        });
      }
      // AAA screening
      if (numericAge >= 65 && formData.smoker) {
        recs.screening.push({
          title: 'Abdominal Aortic Aneurysm Screen',
          frequency: 'One-time screen to discuss',
          details: 'Ultrasound examination - discuss with your doctor',
          rationale: 'Recommended to discuss for male smokers at this age'
        });
      }
    }

    // HPV/Gardasil
    if (numericAge >= 9 && numericAge <= 45) {
      recs.vaccinations.push({
        title: 'HPV Vaccination (Gardasil)',
        frequency: '2-3 doses if eligible',
        details: 'Different eligibility by age - discuss with your doctor',
        rationale: 'Protects against several types of cancer and genital warts'
      });
    }

    // Chronic disease management
    if (formData.diabetes || formData.hypertension || formData.highCholesterol) {
      recs.lifestyle.push({
        title: 'GP Management Plan',
        frequency: 'Annual if eligible',
        details: 'Medicare item 721 - discuss eligibility with your doctor',
        rationale: 'You may qualify for a structured care plan with subsidized allied health visits'
      });
      recs.lifestyle.push({
        title: 'Team Care Arrangement',
        frequency: 'Annual if eligible',
        details: 'Medicare item 723 - discuss with your doctor',
        rationale: 'May provide access to subsidized allied health services'
      });
    }

    // Aboriginal and Torres Strait Islander health
    if (formData.aboriginalOrTorresStrait) {
      recs.screening.push({
        title: 'Health Assessment',
        frequency: 'Annual',
        details: 'Medicare item 715 - discuss with your doctor',
        rationale: 'Comprehensive health check tailored for Indigenous health needs'
      });
    }

    // Diabetes-specific care
    if (formData.diabetes) {
      recs.screening.push({
        title: 'Diabetes Complications Screening',
        frequency: 'Regular intervals - discuss timing',
        details: 'Eyes, feet, kidneys check - discuss with your doctor',
        rationale: 'Regular monitoring helps prevent diabetes complications'
      });
    }

    // Smoking
    if (formData.smoker) {
      recs.screening.push({
        title: 'Lung Health Check',
        frequency: 'Discuss timing with your doctor',
        details: 'Including lung function tests',
        rationale: 'Smoking increases risk of lung disease'
      });
      recs.lifestyle.push({
        title: 'Quit Smoking Support',
        frequency: 'Available when ready',
        details: 'Quitline (13 7848) and GP support available',
        rationale: 'Support and medication can improve chances of quitting'
      });
    }

    // Sexual health
    if (formData.sexuallyActive) {
      if (formData.newPartner) {
        recs.screening.push({
          title: 'Sexual Health Check',
          frequency: 'Discuss with your doctor',
          details: 'STI screening available',
          rationale: 'New partners may increase STI risk'
        });
      }
      
      if (numericAge <= 30) {
        recs.screening.push({
          title: 'Chlamydia Test',
          frequency: 'Discuss with your doctor',
          details: 'Simple urine test available',
          rationale: 'Most common STI in young adults'
        });
      }
    }

    return recs;
  };

  const handleGetRecommendations = () => {
    const results = generateRecommendations();
    setRecommendations(results);
  };

  const CheckboxItem = ({ name, label, checked, onChange }) => (
    <label className="flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <span>{label}</span>
    </label>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Health Topics to Discuss with Your Doctor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="mt-4 mb-2 font-medium text-blue-600">About You</div>
          <div className="space-y-2 mb-4">
            <CheckboxItem
              name="aboriginalOrTorresStrait"
              label="Aboriginal or Torres Strait Islander"
              checked={formData.aboriginalOrTorresStrait}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4 mb-2 font-medium text-blue-600">Health Conditions</div>
          <div className="space-y-2 mb-4">
            <CheckboxItem
              name="smoker"
              label="Current Smoker"
              checked={formData.smoker}
              onChange={handleInputChange}
            />
            <CheckboxItem
              name="diabetes"
              label="Diabetes"
              checked={formData.diabetes}
              onChange={handleInputChange}
            />
            <CheckboxItem
              name="hypertension"
              label="High Blood Pressure"
              checked={formData.hypertension}
              onChange={handleInputChange}
            />
            <CheckboxItem
              name="highCholesterol"
              label="High Cholesterol"
              checked={formData.highCholesterol}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4 mb-2 font-medium text-blue-600">Family History</div>
          <div className="space-y-2 mb-4">
            <CheckboxItem
              name="familyHistoryCancer"
              label="Cancer in Close Family Members"
              checked={formData.familyHistoryCancer}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4 mb-2 font-medium text-blue-600">Sexual Health</div>
          <div className="space-y-2 mb-4">
            <CheckboxItem
              name="sexuallyActive"
              label="Sexually Active"
              checked={formData.sexuallyActive}
              onChange={handleInputChange}
            />
            <CheckboxItem
              name="newPartner"
              label="New Partner in Last 12 Months"
              checked={formData.newPartner}
              onChange={handleInputChange}
            />
          </div>

          <Button
            onClick={handleGetRecommendations}
            className="w-full mt-4"
          >
            Show Health Topics
          </Button>
        </CardContent>
      </Card>

      {recommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Topics You May Want to Discuss with Your Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendations.screening.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Screening</h3>
                  <div className="space-y-2">
                    {recommendations.screening.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600">Frequency: {item.frequency}</div>
                        <div className="text-sm text-gray-600">{item.details}</div>
                        <div className="text-sm text-blue-600 mt-1">Why: {item.rationale}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recommendations.vaccinations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Vaccinations</h3>
                  <div className="space-y-2">
                    {recommendations.vaccinations.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600">Frequency: {item.frequency}</div>
                        <div className="text-sm text-gray-600">{item.details}</div>
                        <div className="text-sm text-blue-600 mt-1">Why: {item.rationale}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recommendations.lifestyle.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Management Plans & Lifestyle</h3>
                  <div className="space-y-2">
                    {recommendations.lifestyle.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600">Frequency: {item.frequency}</div>
                        <div className="text-sm text-gray-600">{item.details}</div>
                        <div className="text-sm text-blue-600 mt-1">Why: {item.rationale}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PreventativeHealthForm;
