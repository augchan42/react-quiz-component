// Here are 12 questions similar to the Voight-Kampff test used in Blade Runner to identify replicants, along with answer choices that correspond to different trigrams:
export const quiz_br = {
    quizTitle: 'I-Ching Personality Test',
    quizSynopsis: 'Answer these questions inspired by Voight-Kampff to discover your personality trigrams.',
    nrOfQuestions: '12',
    questions: [
      {
        id: 'q1', 
        question: "You're walking in the desert and see a tortoise on its back in the sun. What do you do?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { id: 'a1', option: "I would analyze the situation and determine the most logical course of action.", trigram: "Li" },
          { id: 'a2', option: "I would act on my impulse to help the tortoise.", trigram: "Kan" },
          { id: 'a3', option: "I would leave the tortoise, as interfering would go against the natural order.", trigram: "Gen" },
          { id: 'a4', option: "I would help the tortoise and feel a sense of satisfaction from doing so.", trigram: "Dui" }
        ],
        explanation: ""
      },
      {
        id: 'q2', 
        question: "You're watching TV and suddenly notice a wasp crawling on your arm. How do you react?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { id: 'a5', option: "I would calmly assess the situation and take action to remove the wasp.", trigram: "Qian" },
          { id: 'a6', option: "I would feel a sense of panic but try to remain still to avoid provoking the wasp.", trigram: "Kun" },
          { id: 'a7', option: "I would swiftly brush the wasp off my arm, even if it meant harming it.", trigram: "Zhen" },
          { id: 'a8', option: "I would carefully observe the wasp, fascinated by its presence.", trigram: "Xun" }
        ],
        explanation: ""
      },
      {
        id: 'q3',
        question: "You're at a friend's house for dinner, and they serve you a dish made with dog meat. How do you respond?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { id: 'a9', option: "I would politely decline the dish and explain my moral objections.", trigram: "Li" },
          { id: 'a10', option: "I would try the dish out of respect for my friend's culture and hospitality.", trigram: "Kan" },
          { id: 'a11', option: "I would refuse the dish and express my disapproval of the practice.", trigram: "Gen" },
          { id: 'a12', option: "I would engage in a respectful discussion about the cultural differences surrounding the dish.", trigram: "Dui" }
        ],
        explanation: ""
      },
      {
        id: 'q4',
        question: "You're in a magazine store and notice a man shoplifting. What do you do?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { id: 'a13', option: "I would immediately alert the store owner or authorities.", trigram: "Zhen" },
          { id: 'a14', option: "I would observe the situation and gather more information before acting.", trigram: "Xun" },
          { id: 'a15', option: "I would confront the shoplifter and demand they return the stolen items.", trigram: "Qian" },
          { id: 'a16', option: "I would feel conflicted but ultimately decide not to get involved.", trigram: "Kun" }
        ],
        explanation: ""
      },
      {
        id: 'q5',
        question: "You're walking through a busy city street and see a homeless person asking for money. How do you respond?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { id: 'a17', option: "I would assess the situation and determine if giving money would truly help them.", trigram: "Li" },
          { id: 'a18', option: "I would give them some money without hesitation.", trigram: "Kan" },
          { id: 'a19', option: "I would acknowledge their presence but continue walking, as I believe it's not my responsibility.", trigram: "Gen" },
          { id: 'a20', option: "I would stop and have a conversation with them, offering non-monetary assistance if possible.", trigram: "Dui" }
        ],
        explanation: ""
      },
      {
        id: 'q6',
        question: "You're at a party and overhear someone making a racist comment. What do you do?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { option: "I would confront the person and explain why their comment was unacceptable.", trigram: "Qian" },
          { option: "I would feel uncomfortable but avoid confrontation, opting to leave the conversation.", trigram: "Kun" },
          { option: "I would speak up and call out the racist comment immediately.", trigram: "Zhen" },
          { option: "I would try to steer the conversation in a more positive direction.", trigram: "Xun" }
        ],
        explanation: ""
      },
      {
        question: "You're watching a movie with a group of friends, and one of them begins to cry during an emotional scene. How do you react?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { option: "I would analyze the scene to understand what triggered their emotional response.", trigram: "Li" },
          { option: "I would feel empathy for my friend and offer comfort.", trigram: "Kan" },
          { option: "I would maintain a respectful distance and allow them to process their emotions privately.", trigram: "Gen" },
          { option: "I would lighten the mood with a well-timed joke or humorous observation.", trigram: "Dui" }
        ],
        explanation: ""
      },
      {
        question: "You're on a hike and come across a small, injured animal. What do you do?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { option: "I would take charge of the situation and find a way to help the animal.", trigram: "Zhen" },
          { option: "I would assess the animal's injuries and determine the best course of action.", trigram: "Xun" },
          { option: "I would feel a strong urge to help but ultimately decide it's best not to intervene.", trigram: "Kun" },
          { option: "I would help the animal without hesitation, driven by compassion.", trigram: "Qian" }
        ],
        explanation: ""
      },
      {
        question: "You're on a first date, and your partner reveals they have a terminal illness. How do you respond?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { option: "I would ask questions to better understand their situation and offer support.", trigram: "Li" },
          { option: "I would feel deeply moved and express my admiration for their bravery.", trigram: "Kan" },
          { option: "I would feel overwhelmed and uncertain about pursuing the relationship further.", trigram: "Gen" },
          { option: "I would express my empathy and find ways to make the most of our time together.", trigram: "Dui" }
        ],
        explanation: ""
      },
      {
        question: "You witness a violent crime taking place. What is your immediate reaction?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { option: "I would quickly assess the situation and take action to help the victim.", trigram: "Qian" },
          { option: "I would feel frightened but call for help or find a way to assist from a safe distance.", trigram: "Kun" },
          { option: "I would intervene without hesitation, driven by a strong sense of justice.", trigram: "Zhen" },
          { option: "I would observe the situation carefully, looking for the best way to help without putting myself at risk.", trigram: "Xun" }
        ],
        explanation: ""
      },
      {
        question: "You find out that your closest friend has been lying to you for years. How do you confront them?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { option: "I would calmly ask them to explain their actions and decide how to proceed based on their response.", trigram: "Li" },
          { option: "I would express my hurt and disappointment, but be willing to forgive if they show genuine remorse.", trigram: "Kan" },
          { option: "I would end the friendship, as the betrayal would be too difficult to move past.", trigram: "Gen" },
          { option: "I would have an honest conversation with them, focusing on understanding their motivations and rebuilding trust.", trigram: "Dui" }
        ],
        explanation: ""
      },
      {
        question: "You're in a self-driving car that's about to hit a pedestrian. The car gives you the option to divert, which would kill you but save the pedestrian. What do you do?",
        questionType: "text",
        answerSelectionType: "personality",
        answers: [
          { option: "I would sacrifice myself to save the pedestrian without hesitation.", trigram: "Zhen" },
          { option: "I would carefully consider the implications of each choice before making a decision.", trigram: "Xun" },
          { option: "I would feel torn but ultimately choose to save myself.", trigram: "Kun" },
          { option: "I would divert the car to save the pedestrian, accepting the consequences of my action.", trigram: "Qian" }
        ],
        explanation: ""
      }
    ]
  };
  
  export default quiz_br;

  {/* These questions are designed to probe deeper into a person's empathy, morality, and decision-making process under pressure, much like the Voight-Kampff test in Blade Runner. The answer choices represent different trigrams and provide insight into how an individual might respond to these challenging situations. */}