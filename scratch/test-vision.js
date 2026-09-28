const apiKey = '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';

async function testVisionAndText() {
  const models = [
    'meta/llama-3.2-11b-vision-instruct',
    'meta/llama-3.2-90b-vision-instruct'
  ];

  for (const model of models) {
    try {
      const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant specialized in Government of India citizen grievances. Output valid JSON only.'
            },
            {
              role: 'user',
              content: 'Improve this grievance: "Broken water pipe in Mylapore Chennai causing dirty water". Respond in JSON with keys: improved_title, improved_description, suggested_severity, summary_points.'
            }
          ],
          temperature: 0.2,
          max_tokens: 300
        })
      });
      const data = await res.json();
      console.log(`Model [${model}] status: ${res.status}`);
      console.log('Result:', data.choices?.[0]?.message?.content);
    } catch (e) {
      console.error(`Model [${model}] error:`, e);
    }
  }
}

testVisionAndText();
