const segment = {
  basic: 'Basic',
  medium: 'Medium',
  advanced: 'Advanced',
};

const quiz = {
  quizTitle: 'I-Ching Personality Test',
  quizSynopsis: 'You will be asked questions that will try to find the hexagrams that best represent your personality.',
  nrOfQuestions: '2',
  questions: [
    {
      question: 'If you were offered the red pill or the blue pill, which would you choose?',
      questionType: 'text',
      answerSelectionType: 'personality',
      answers: [
        { option: 'I would choose the red pill and embrace the sometimes painful truth of reality.', trigram: 'Qian' },
        { option: 'I would choose the blue pill and stay in the comfort of the illusion.', trigram: 'Kun' },
        { option: 'I would find a way to take both pills and create my own reality.', trigram: 'Zhen' },
        { option: 'I would ask for more information before making a decision.', trigram: 'Xun' }
      ],
      explanation: '',
    },
    {
      question: "How do you approach a glitch in the Matrix?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "I analyze the glitch to understand its underlying cause.",
          trigram: "Li"
        },
        {
          option: "I go with the flow and adapt to the glitch.",
          trigram: "Kan"
        },
        {
          option: "I see the glitch as an opportunity for growth and self-discovery.",
          trigram: "Gen"
        },
        {
          option: "I use the glitch to my advantage and have some fun with it.",
          trigram: "Dui"
        }
      ],
      explanation: ""
    },
    {
      question: "What role would you play in the resistance against the machines?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "I would be a fearless leader, inspiring others to fight.",
          trigram: "Zhen"
        },
        {
          option: "I would be a strategist, planning our next moves.",
          trigram: "Xun"
        },
        {
          option: "I would be a mentor, guiding others to find their own path.",
          trigram: "Qian"
        },
        {
          option: "I would be a caretaker, ensuring everyone's well-being.",
          trigram: "Kun"
        }
      ],
      explanation: ""
    },
    {
      question: "How do you respond to Agent Smith's interrogation?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "I remain calm and composed, revealing nothing.",
          trigram: "Gen"
        },
        {
          option: "I engage in witty banter, trying to throw him off balance.",
          trigram: "Dui"
        },
        {
          option: "I analyze his questions, looking for hidden meanings.",
          trigram: "Li"
        },
        {
          option: "I trust my instincts and say whatever feels right in the moment.",
          trigram: "Kan"
        }
      ],
      explanation: ""
    },
    {
      question: "What aspect of the Matrix world would you find most appealing?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "The ability to bend the rules of reality to my will.",
          trigram: "Qian"
        },
        {
          option: "The opportunity to explore and learn about a new world.",
          trigram: "Kun"
        },
        {
          option: "The thrill of fighting against the system.",
          trigram: "Zhen"
        },
        {
          option: "The chance to connect with others who share my experiences.",
          trigram: "Xun"
        }
      ],
      explanation: ""
    },
    {
      question: "How would you describe your fighting style in the Matrix?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "Precise and calculated, always thinking several moves ahead.",
          trigram: "Li"
        },
        {
          option: "Fluid and adaptable, responding to my opponent's moves.",
          trigram: "Kan"
        },
        {
          option: "Solid and grounded, using my strength and stability to my advantage.",
          trigram: "Gen"
        },
        {
          option: "Creative and unpredictable, catching my opponents off guard.",
          trigram: "Dui"
        }
      ],
      explanation: ""
    },
    {
      question: "What would be your motivation for joining the resistance?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "To unlock my full potential and abilities.",
          trigram: "Zhen"
        },
        {
          option: "To understand the true nature of reality.",
          trigram: "Xun"
        },
        {
          option: "To lead others to freedom and enlightenment.",
          trigram: "Qian"
        },
        {
          option: "To protect and care for those who cannot fight for themselves.",
          trigram: "Kun"
        }
      ],
      explanation: ""
    },

    {
      question: "How would you react to the revelation that the world you know is a simulation?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "I would be intrigued and want to learn more.",
          trigram: "Gen"
        },
        {
          option: "I would be excited by the possibilities this revelation presents.",
          trigram: "Dui"
        },
        {
          option: "I would be determined to uncover the truth behind the simulation.",
          trigram: "Li"
        },
        {
          option: "I would feel a sense of unease and uncertainty about my existence.",
          trigram: "Kan"
        }
      ],
      explanation: ""
    },
    {
      question: "What would be your approach to training in the Construct?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "I would push myself to my limits, always striving to improve.",
          trigram: "Qian"
        },
        {
          option: "I would take my time, gradually building my skills and knowledge.",
          trigram: "Kun"
        },
        {
          option: "I would embrace the challenge, eager to test my abilities.",
          trigram: "Zhen"
        },
        {
          option: "I would focus on developing my mental discipline and perception.",
          trigram: "Xun"
        }
      ],
      explanation: ""
    },
    {
      question: "How would you deal with the loss of a crew member?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "I would honor their memory by continuing the fight with renewed determination.",
          trigram: "Li"
        },
        {
          option: "I would take time to grieve and process my emotions.",
          trigram: "Kan"
        },
        {
          option: "I would use their loss as a reminder of the impermanence of life.",
          trigram: "Gen"
        },
        {
          option: "I would celebrate their life and the time we had together.",
          trigram: "Dui"
        }
      ],
      explanation: ""
    },
    {
      question: "What would be your role in the final battle against the machines?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "I would be on the front lines, leading the charge.",
          trigram: "Zhen"
        },
        {
          option: "I would be coordinating our efforts and adapting our strategy as needed.",
          trigram: "Xun"
        },
        {
          option: "I would be a source of strength and inspiration for the others.",
          trigram: "Qian"
        },
        {
          option: "I would be tending to the wounded and ensuring everyone is cared for.",
          trigram: "Kun"
        }
      ],
      explanation: ""
    },
    {
      question: "How do you think you would react to meeting the Oracle?",
      questionType: "text",
      answerSelectionType: "personality",
      answers: [
        {
          option: "I would be skeptical of her abilities and question her motives.",
          trigram: "Gen"
        },
        {
          option: "I would be open to her insights and curious about what she has to say.",
          trigram: "Dui"
        },
        {
          option: "I would analyze her words for hidden meanings and try to understand her true nature.",
          trigram: "Li"
        },
        {
          option: "I would trust my instincts and let the meeting unfold naturally.",
          trigram: "Kan"
        }
      ],
      explanation: ""
    }
  ]
};

export default quiz;
