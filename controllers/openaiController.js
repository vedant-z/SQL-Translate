const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateSQLQuery = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 2048,
      prompt,
      temperature: 0.2,
    });

    const query = response.data.choices[0].text;

    res.status(200).json({
      success: true,
      result: query,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The query could not be generated',
    });
  }
};

module.exports = { generateSQLQuery };
