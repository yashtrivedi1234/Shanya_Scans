import React from 'react';

const TestContent = () => {
  return (
    <div className=" py-8 ">
      <div className="bg-white shadow-lg rounded-lg p-6 ">
        <h1 className="text-3xl font-bold  text-gray-800 mb-6">
          Anti-Mullerian Hormone (AMH) Test
        </h1>

        {/* Section: What is the AMH Test */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            What is the AMH Test?
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            The AMH test measures the level of Anti-Mullerian Hormone (AMH) in your blood. AMH is produced in both males and females and plays a crucial role in fertility, helping to assess the ovarian reserve and predict a woman's reproductive potential.
          </p>
        </section>

        {/* Section: Why is the AMH Test Important */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Why is the AMH Test Important?
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            AMH is crucial in evaluating fertility. In women, AMH levels indicate the number of eggs remaining in the ovaries, and its levels help assess the chance of getting pregnant. Elevated AMH levels may indicate Polycystic Ovary Syndrome (PCOS).
          </p>
        </section>

        {/* Section: Test Parameters */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Test Parameters
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            This test measures a single parameter: Anti-Mullerian Hormone (AMH).
          </p>
        </section>

        {/* Section: Interpreting AMH Results */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Interpreting AMH Results
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            - <strong>High AMH Levels:</strong> Indicate better fertility potential, but may suggest PCOS. <br />
            - <strong>Low AMH Levels:</strong> Suggest lower ovarian reserve and reduced fertility. <br />
            - <strong>Very Low or Absent AMH:</strong> Can indicate ovarian failure or developmental disorders.
          </p>
        </section>

        {/* Section: Price of the Test */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Price of the AMH Test
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            The AMH test typically costs between ₹2,000 to ₹5,000, depending on the lab and location.
          </p>
        </section>


      </div>
    </div>
  );
};

export default TestContent;
