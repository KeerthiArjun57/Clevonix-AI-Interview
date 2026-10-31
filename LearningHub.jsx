import { useState, useEffect } from "react";
import "./LearningHub.css";

function LearningHub({ onHomeClick }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentPractice, setCurrentPractice] = useState(0);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const lessons = [
    {
      id: 1,
      icon: "🗣️",
      title: "Self Introduction",
      description:
        "Learn how to introduce yourself confidently and professionally.",
      question: "Tell me about yourself.",
      points: [
        "Start with your name and educational background.",
        "Mention your important technical skills.",
        "Briefly explain your project or internship.",
        "Mention your strengths naturally.",
        "End with your career interest."
      ],
      sample:
        "My name is Keerthi. I am pursuing B.Tech in Artificial Intelligence and Data Analytics. I have a strong interest in Python, SQL, Machine Learning and Data Analytics. I have worked on projects where I applied these skills to practical problems. I am a quick learner and I enjoy improving my technical knowledge. I am looking forward to starting my career in a professional environment where I can learn, contribute and grow.",
      mistakes: [
        "Do not tell your entire personal history.",
        "Do not simply read your resume.",
        "Avoid making the introduction too long.",
        "Keep your answer related to the interview."
      ],
      practiceQuestions: [
        {
          q: "Tell me about yourself.",
          a: "Introduce your education, technical skills, projects, strengths and career goal in a short and structured way."
        },
        {
          q: "Can you introduce yourself briefly?",
          a: "Give a short introduction covering your academic background, key skills and your career interest."
        },
        {
          q: "Walk me through your background.",
          a: "Explain your education, relevant skills, projects and experiences in chronological order."
        },
        {
          q: "What are you currently studying?",
          a: "Mention your degree, specialization and the areas you are currently interested in."
        },
        {
          q: "What are your key skills?",
          a: "Mention skills relevant to the role and briefly explain where you have applied them."
        },
        {
          q: "Tell me about your academic background.",
          a: "Talk about your degree, specialization and important areas of study."
        },
        {
          q: "What projects have you worked on?",
          a: "Mention one or two relevant projects and explain your role and technologies used."
        },
        {
          q: "What are your strengths?",
          a: "Mention genuine strengths and support them with a short example."
        },
        {
          q: "What is one weakness you are working on?",
          a: "Mention a manageable weakness and explain the steps you are taking to improve it."
        },
        {
          q: "Why did you choose your field?",
          a: "Explain your interest in the field and how your experiences developed that interest."
        },
        {
          q: "Why are you interested in this role?",
          a: "Connect your skills, interests and career goals with the responsibilities of the role."
        },
        {
          q: "Why should we hire you?",
          a: "Explain how your skills, learning attitude and ability to contribute match the requirements of the role."
        },
        {
          q: "What makes you different from other candidates?",
          a: "Focus on your genuine strengths, learning attitude, project experience and willingness to improve."
        },
        {
          q: "What motivates you?",
          a: "Talk about learning, solving problems, achieving goals or contributing to meaningful work."
        },
        {
          q: "What are your career goals?",
          a: "Explain your short-term learning goals and long-term professional growth."
        },
        {
          q: "What have you learned from your projects?",
          a: "Mention technical knowledge, problem-solving and teamwork skills gained from your projects."
        },
        {
          q: "How would your friends describe you?",
          a: "Choose a few genuine positive qualities and support them with a simple example."
        },
        {
          q: "What do you enjoy learning?",
          a: "Mention technologies or subjects related to your career interests."
        },
        {
          q: "What are you looking for in your first job?",
          a: "Focus on learning opportunities, professional growth, teamwork and meaningful responsibilities."
        },
        {
          q: "Where do you see yourself in five years?",
          a: "Describe a realistic professional goal involving expertise, responsibility and continuous learning."
        },
        {
          q: "Why should we remember you?",
          a: "Give a concise summary of your strongest qualities and the value you can bring."
        }
      ]
    },

    {
      id: 2,
      icon: "🤖",
      title: "Technical Questions",
      description:
        "Learn how to answer technical questions with clear definitions and examples.",
      question: "How do you answer a technical interview question?",
      points: [
        "Understand the question first.",
        "Start with a simple definition.",
        "Explain the concept clearly.",
        "Use an example when useful.",
        "Be honest if you do not know the answer."
      ],
      sample:
        "Python is a high-level programming language known for its simple and readable syntax. It is widely used for data analysis, machine learning, automation and software development.",
      mistakes: [
        "Do not guess technical answers.",
        "Do not give unrelated information.",
        "Do not memorize without understanding.",
        "Be prepared for follow-up questions."
      ],
      practiceQuestions: [
        {
          q: "What is Python?",
          a: "Python is a high-level, interpreted programming language known for readable syntax and a large collection of libraries."
        },
        {
          q: "What are Python data types?",
          a: "Common Python data types include integer, float, string, boolean, list, tuple, set and dictionary."
        },
        {
          q: "What is a list in Python?",
          a: "A list is an ordered and mutable collection that can store multiple values."
        },
        {
          q: "What is a tuple?",
          a: "A tuple is an ordered collection that is immutable after creation."
        },
        {
          q: "What is a dictionary?",
          a: "A dictionary stores data as key-value pairs."
        },
        {
          q: "What is OOP?",
          a: "Object-oriented programming organizes software around objects containing data and behaviour."
        },
        {
          q: "What is inheritance?",
          a: "Inheritance allows a class to acquire properties and methods from another class."
        },
        {
          q: "What is polymorphism?",
          a: "Polymorphism allows the same interface or method concept to work with different object types."
        },
        {
          q: "What is SQL?",
          a: "SQL is a language used to create, query and manage data in relational databases."
        },
        {
          q: "What is a primary key?",
          a: "A primary key uniquely identifies each record in a database table."
        },
        {
          q: "What is a foreign key?",
          a: "A foreign key creates a relationship between tables by referencing a key from another table."
        },
        {
          q: "What is normalization?",
          a: "Normalization organizes relational data to reduce unnecessary duplication and improve consistency."
        },
        {
          q: "What is machine learning?",
          a: "Machine learning enables systems to learn patterns from data and use those patterns to make predictions or decisions."
        },
        {
          q: "What is supervised learning?",
          a: "Supervised learning uses labeled training data to learn a mapping between inputs and expected outputs."
        },
        {
          q: "What is unsupervised learning?",
          a: "Unsupervised learning finds patterns or structures in data without labeled target outputs."
        },
        {
          q: "What is overfitting?",
          a: "Overfitting occurs when a model learns training data too closely and performs poorly on unseen data."
        },
        {
          q: "What is train-test split?",
          a: "It separates data into training and testing portions so model performance can be evaluated on unseen data."
        },
        {
          q: "What is an API?",
          a: "An API is a defined interface that allows different software systems to communicate with each other."
        },
        {
          q: "What is Git?",
          a: "Git is a distributed version control system used to track changes in files and collaborate on software projects."
        },
        {
          q: "What is time complexity?",
          a: "Time complexity describes how an algorithm's running time grows as the input size increases."
        },
        {
          q: "What is binary search?",
          a: "Binary search repeatedly divides a sorted search space into smaller portions to locate a target efficiently."
        }
      ]
    },

    {
      id: 3,
      icon: "📄",
      title: "Resume Questions",
      description:
        "Learn how to confidently explain every important section of your resume.",
      question: "Can you explain your resume?",
      points: [
        "Know every skill mentioned in your resume.",
        "Understand every project.",
        "Explain your role clearly.",
        "Connect your experience with the job.",
        "Be honest about your experience."
      ],
      sample:
        "My resume includes my education, technical skills, internships and projects. My main areas of interest are Python, SQL, Machine Learning and Data Analytics. I have worked on projects that helped me apply these skills to practical problems.",
      mistakes: [
        "Do not mention skills you cannot explain.",
        "Do not claim someone else's work.",
        "Do not memorize the resume word-for-word.",
        "Do not give unnecessarily long explanations."
      ],
      practiceQuestions: [
        {
          q: "Can you explain your resume?",
          a: "Briefly walk through your education, skills, experience, projects and achievements."
        },
        {
          q: "Explain your main project.",
          a: "Explain the problem, objective, technologies used, your role and the result."
        },
        {
          q: "Why did you choose this project?",
          a: "Explain the problem you wanted to solve and why the project was meaningful."
        },
        {
          q: "What was your role in the project?",
          a: "Clearly describe the tasks and responsibilities you personally handled."
        },
        {
          q: "What technologies did you use?",
          a: "Mention the technologies and explain why they were suitable for the project."
        },
        {
          q: "What challenges did you face?",
          a: "Describe a real challenge and explain the approach you used to solve it."
        },
        {
          q: "What did you learn from the project?",
          a: "Mention both technical knowledge and practical skills gained."
        },
        {
          q: "Which project are you most proud of?",
          a: "Choose a project where you made meaningful contributions and explain why."
        },
        {
          q: "Which skill on your resume is strongest?",
          a: "Choose a skill you can demonstrate confidently with practical examples."
        },
        {
          q: "How did you learn this technology?",
          a: "Explain whether you learned through coursework, projects, internships or self-learning."
        },
        {
          q: "Tell me about your internship.",
          a: "Explain the organization, role, responsibilities and important learning outcomes."
        },
        {
          q: "What was your contribution during your internship?",
          a: "Focus on the actual tasks and responsibilities you handled."
        },
        {
          q: "Why did you choose these technologies?",
          a: "Connect the technology choice with the project requirements."
        },
        {
          q: "What would you improve in your project?",
          a: "Mention realistic improvements based on what you learned."
        },
        {
          q: "Did you work individually or in a team?",
          a: "Clearly explain the project structure and your individual contribution."
        },
        {
          q: "How did you test your project?",
          a: "Explain the testing, validation or evaluation methods you used."
        },
        {
          q: "What was the biggest challenge in your project?",
          a: "Describe the challenge, your action and the result."
        },
        {
          q: "Which resume skill do you want to improve?",
          a: "Mention a genuine area for improvement and your learning plan."
        },
        {
          q: "How does your project relate to this job?",
          a: "Connect your project's technologies and skills with the job requirements."
        },
        {
          q: "What achievement are you most proud of?",
          a: "Describe a genuine achievement and explain the effort or learning behind it."
        },
        {
          q: "Is everything on your resume your own work?",
          a: "Answer honestly and clearly explain your individual contributions."
        }
      ]
    },

    {
      id: 4,
      icon: "🎤",
      title: "Communication Skills",
      description:
        "Improve clarity, confidence, listening and professional communication.",
      question: "How can you communicate effectively in an interview?",
      points: [
        "Listen carefully.",
        "Think before answering.",
        "Speak clearly.",
        "Use professional language.",
        "Maintain confidence."
      ],
      sample:
        "I believe effective communication starts with listening carefully. I understand the question first and then explain my answer clearly using simple language and examples.",
      mistakes: [
        "Do not speak too quickly.",
        "Avoid excessive filler words.",
        "Do not interrupt.",
        "Avoid overly casual language."
      ],
      practiceQuestions: [
        {
          q: "How would you describe your communication style?",
          a: "Describe your communication as clear, respectful, attentive and professional."
        },
        {
          q: "How do you handle misunderstandings?",
          a: "Clarify the issue calmly and confirm that both sides understand the information."
        },
        {
          q: "How do you explain a technical concept?",
          a: "Start with a simple definition and then use an example suited to the listener."
        },
        {
          q: "How do you communicate in a team?",
          a: "Share information clearly, listen to others and keep teammates updated."
        },
        {
          q: "How do you handle feedback?",
          a: "Listen carefully, understand the feedback and use it to improve."
        },
        {
          q: "How do you communicate under pressure?",
          a: "Stay calm, organize your thoughts and communicate the most important information clearly."
        },
        {
          q: "How do you make your answers clear?",
          a: "Structure the answer logically and avoid unnecessary information."
        },
        {
          q: "What is active listening?",
          a: "Active listening means paying attention, understanding the speaker and responding appropriately."
        },
        {
          q: "How do you handle a disagreement?",
          a: "Listen to the other perspective and discuss the issue respectfully using facts."
        },
        {
          q: "How do you speak confidently?",
          a: "Prepare well, understand the topic and speak at a comfortable pace."
        },
        {
          q: "What if you need time to think?",
          a: "Take a brief moment to organize your thoughts before answering."
        },
        {
          q: "How do you avoid misunderstandings?",
          a: "Use clear language and confirm important information when necessary."
        },
        {
          q: "How do you communicate with different people?",
          a: "Adapt your explanation and communication style according to the audience."
        },
        {
          q: "Why is listening important?",
          a: "Good listening helps you understand the question correctly and respond appropriately."
        },
        {
          q: "How do you explain your ideas in a meeting?",
          a: "Present the main idea first and then support it with relevant details."
        },
        {
          q: "How do you respond to criticism?",
          a: "Listen without becoming defensive and identify useful points for improvement."
        },
        {
          q: "How can you improve communication?",
          a: "Practice speaking, listen actively and seek constructive feedback."
        },
        {
          q: "How do you handle nervousness while speaking?",
          a: "Prepare beforehand, take a breath and focus on communicating one idea at a time."
        },
        {
          q: "How do you communicate complex information?",
          a: "Break it into smaller parts and explain each part using simple examples."
        },
        {
          q: "What makes communication professional?",
          a: "Clarity, respect, appropriate language, active listening and confidence make communication professional."
        },
        {
          q: "How do you ensure someone understood you?",
          a: "Ask appropriate follow-up questions or request confirmation when needed."
        }
      ]
    },

    {
      id: 5,
      icon: "❓",
      title: "Difficult Questions",
      description:
        "Learn how to stay calm and professional when unexpected questions appear.",
      question: "What should you do if you do not know an answer?",
      points: [
        "Stay calm.",
        "Be honest.",
        "Share what you know.",
        "Do not invent information.",
        "Show willingness to learn."
      ],
      sample:
        "I am not completely familiar with that concept yet. I understand the basic idea, but I would like to learn more about it. I am always willing to improve my knowledge.",
      mistakes: [
        "Do not panic.",
        "Do not make up information.",
        "Do not become defensive.",
        "Do not stop communicating."
      ],
      practiceQuestions: [
        {
          q: "What if you do not know the answer?",
          a: "Be honest, explain what you understand and show willingness to learn."
        },
        {
          q: "Why should we not reject you?",
          a: "Focus on your ability to learn, adapt and contribute rather than criticizing yourself."
        },
        {
          q: "What is your biggest weakness?",
          a: "Mention a manageable weakness and explain the steps you are taking to improve."
        },
        {
          q: "Why did you get a low mark in a subject?",
          a: "Give an honest explanation and focus on what you learned and improved afterward."
        },
        {
          q: "Why should we hire a fresher?",
          a: "Highlight your learning ability, current technical skills, adaptability and enthusiasm."
        },
        {
          q: "Why do you want this job?",
          a: "Connect the role with your skills, interests and career goals."
        },
        {
          q: "Why did you choose this career?",
          a: "Explain your genuine interest and how your academic or project experience developed it."
        },
        {
          q: "What if you fail at a task?",
          a: "Analyze what went wrong, learn from it and improve your approach."
        },
        {
          q: "How do you handle rejection?",
          a: "Treat rejection as feedback and identify areas that can be improved."
        },
        {
          q: "What if your manager disagrees with you?",
          a: "Listen to the manager's reasoning and discuss your perspective respectfully."
        },
        {
          q: "What if you make a mistake?",
          a: "Accept responsibility, correct the mistake and learn from it."
        },
        {
          q: "Why are your grades not higher?",
          a: "Answer honestly and explain your learning, projects or improvement efforts."
        },
        {
          q: "What if you are given an unfamiliar task?",
          a: "Understand the requirement, research the topic and ask appropriate questions."
        },
        {
          q: "How do you handle pressure?",
          a: "Prioritize tasks, stay organized and focus on one problem at a time."
        },
        {
          q: "What if you disagree with your teammate?",
          a: "Discuss the issue respectfully and focus on the best solution."
        },
        {
          q: "What if you are asked a personal question?",
          a: "Respond professionally and redirect the discussion toward relevant professional information when appropriate."
        },
        {
          q: "What if you realize your answer was wrong?",
          a: "Acknowledge the correction and provide the accurate information."
        },
        {
          q: "What if the interviewer challenges your answer?",
          a: "Listen carefully and explain your reasoning without becoming defensive."
        },
        {
          q: "What if you cannot complete a task on time?",
          a: "Communicate the issue early, explain the status and discuss a realistic completion plan."
        },
        {
          q: "What is something you are still learning?",
          a: "Mention a relevant skill and explain how you are currently improving it."
        },
        {
          q: "How do you handle an unexpected question?",
          a: "Pause briefly, understand the question and answer based on what you genuinely know."
        }
      ]
    },

    {
      id: 6,
      icon: "⭐",
      title: "Interview Do's & Don'ts",
      description:
        "Learn the important habits that create a professional interview impression.",
      question: "What should you do and avoid during an interview?",
      points: [
        "Research the company.",
        "Be punctual.",
        "Listen carefully.",
        "Answer honestly.",
        "Thank the interviewer."
      ],
      sample:
        "Before an interview, I would research the company and review my resume. During the interview, I would listen carefully, communicate clearly and answer honestly. At the end, I would thank the interviewer.",
      mistakes: [
        "Do not arrive unprepared.",
        "Do not interrupt.",
        "Do not speak negatively about others.",
        "Do not use unprofessional language."
      ],
      practiceQuestions: [
        {
          q: "What should you do before an interview?",
          a: "Research the company, understand the role, review your resume and prepare for common questions."
        },
        {
          q: "Why is punctuality important?",
          a: "Being punctual demonstrates responsibility and respect for the interviewer's time."
        },
        {
          q: "Should you research the company?",
          a: "Yes. Understand the company's work, industry, products or services and the role."
        },
        {
          q: "Should you ask questions at the end?",
          a: "Yes. Ask relevant questions about the role, team or work environment."
        },
        {
          q: "Should you carry your resume?",
          a: "Keep an updated copy available when appropriate for the interview format."
        },
        {
          q: "Should you interrupt the interviewer?",
          a: "No. Allow the interviewer to complete the question before responding."
        },
        {
          q: "How should you answer questions?",
          a: "Answer clearly, honestly and directly while providing enough relevant detail."
        },
        {
          q: "Should you memorize every answer?",
          a: "No. Understand your experiences and prepare key points rather than memorizing scripts."
        },
        {
          q: "Should you speak negatively about a previous organization?",
          a: "Avoid unnecessary negativity and remain professional when discussing previous experiences."
        },
        {
          q: "What should you do when the interview ends?",
          a: "Thank the interviewer and leave politely."
        },
        {
          q: "How should you handle your phone?",
          a: "Keep it silent and avoid checking it during the interview."
        },
        {
          q: "Should you maintain eye contact?",
          a: "Maintain comfortable and natural eye contact while speaking and listening."
        },
        {
          q: "Should you ask about salary immediately?",
          a: "Follow the interview process and discuss compensation at an appropriate stage."
        },
        {
          q: "What should you wear?",
          a: "Choose clean, neat and role-appropriate professional clothing."
        },
        {
          q: "What should you do if you arrive early?",
          a: "Use the time to relax, review your preparation and be ready when called."
        },
        {
          q: "Should you lie during an interview?",
          a: "No. Give honest information about your skills and experience."
        },
        {
          q: "How should you respond to feedback?",
          a: "Listen respectfully and consider how you can use it for improvement."
        },
        {
          q: "Should you speak continuously?",
          a: "No. Give concise answers and allow the interviewer to guide the conversation."
        },
        {
          q: "What should you do if you make a mistake?",
          a: "Correct it calmly and continue professionally."
        },
        {
          q: "Why is preparation important?",
          a: "Preparation improves confidence and helps you give accurate, structured answers."
        },
        {
          q: "What is one important interview rule?",
          a: "Be prepared, honest, respectful and professional throughout the interview."
        }
      ]
    },

    {
      id: 7,
      icon: "🏢",
      title: "Company Research",
      description:
        "Learn what to research about a company before attending an interview.",
      question: "What do you know about our company?",
      points: [
        "Understand the company's products or services.",
        "Research the industry.",
        "Understand the job role.",
        "Learn about important company developments.",
        "Connect your interests with the company."
      ],
      sample:
        "Before attending the interview, I researched the company's products, services and industry. I also looked at the requirements of the role and the technologies related to it. I found the company's work interesting because it matches my technical interests.",
      mistakes: [
        "Do not attend without researching the company.",
        "Do not give unverified information.",
        "Do not focus only on salary.",
        "Do not confuse the company with another organization."
      ],
      practiceQuestions: [
        {
          q: "What do you know about our company?",
          a: "Mention the company's main business, products or services and relevant industry information."
        },
        {
          q: "Why do you want to join our company?",
          a: "Connect your skills and interests with the company's work and the role."
        },
        {
          q: "What products does our company offer?",
          a: "Mention products or services you have verified through reliable company information."
        },
        {
          q: "What do you know about our industry?",
          a: "Explain the company's industry and important trends relevant to its work."
        },
        {
          q: "Why did you apply for this role?",
          a: "Explain how the role matches your skills, interests and career goals."
        },
        {
          q: "What interests you about our company?",
          a: "Mention specific aspects of the company's work that genuinely interest you."
        },
        {
          q: "Who are our customers?",
          a: "Describe the customer groups served by the company based on verified information."
        },
        {
          q: "What did you learn from our website?",
          a: "Mention useful information about products, services, values or company activities."
        },
        {
          q: "What do you know about our competitors?",
          a: "Mention relevant competitors and explain the market context carefully."
        },
        {
          q: "What company value do you connect with?",
          a: "Choose a genuine company value and explain why it matters to you."
        },
        {
          q: "What do you expect from this role?",
          a: "Focus on learning, responsibilities, contribution and professional growth."
        },
        {
          q: "How can you contribute to our company?",
          a: "Connect your current skills and learning attitude with the role's requirements."
        },
        {
          q: "Why should we choose you for this role?",
          a: "Explain how your relevant skills and willingness to learn fit the position."
        },
        {
          q: "What did you learn about our recent work?",
          a: "Mention a recent company activity or development you have verified."
        },
        {
          q: "What attracts you to our industry?",
          a: "Explain your genuine interest and relevant technical or academic background."
        },
        {
          q: "What would you like to learn here?",
          a: "Mention technologies, processes or professional skills relevant to the role."
        },
        {
          q: "How did you prepare for this interview?",
          a: "Explain that you researched the company, role and relevant technical areas."
        },
        {
          q: "What questions do you have about our company?",
          a: "Ask thoughtful questions about the role, team, projects or learning opportunities."
        },
        {
          q: "What makes this company interesting to you?",
          a: "Give a specific reason based on the company's work or industry."
        },
        {
          q: "Why this company instead of another?",
          a: "Focus on specific aspects of the company's work that align with your goals."
        },
        {
          q: "How does this role fit your career plan?",
          a: "Explain how the role can help you develop relevant skills and experience."
        }
      ]
    },

    {
      id: 8,
      icon: "👔",
      title: "Professional Etiquette",
      description:
        "Learn professional greetings, body language, eye contact and behaviour.",
      question: "How should you behave professionally during an interview?",
      points: [
        "Greet politely.",
        "Maintain appropriate eye contact.",
        "Use professional body language.",
        "Listen without interrupting.",
        "Communicate respectfully."
      ],
      sample:
        "I would greet the interviewer politely and maintain professional body language throughout the interview. I would listen carefully without interrupting and answer respectfully.",
      mistakes: [
        "Do not interrupt.",
        "Avoid distracting movements.",
        "Do not use overly casual language.",
        "Avoid checking your phone."
      ],
      practiceQuestions: [
        {
          q: "How should you greet an interviewer?",
          a: "Greet politely and respectfully using an appropriate professional greeting."
        },
        {
          q: "Why is body language important?",
          a: "Professional body language can support clear and confident communication."
        },
        {
          q: "How should you sit during an interview?",
          a: "Sit comfortably with an attentive and professional posture."
        },
        {
          q: "How much eye contact is appropriate?",
          a: "Maintain natural, comfortable eye contact without staring."
        },
        {
          q: "Should you smile during an interview?",
          a: "A natural and appropriate smile can help create a friendly professional interaction."
        },
        {
          q: "Should you interrupt the interviewer?",
          a: "No. Wait until the interviewer finishes speaking."
        },
        {
          q: "How should you respond when entering the interview?",
          a: "Enter politely, greet the interviewer and wait for appropriate instructions."
        },
        {
          q: "How should you respond to difficult feedback?",
          a: "Listen respectfully and consider the useful points."
        },
        {
          q: "How should you address the interviewer?",
          a: "Use the professional form of address appropriate to the context."
        },
        {
          q: "What should you do with your phone?",
          a: "Keep it silent and avoid using it during the interview."
        },
        {
          q: "Why is listening important?",
          a: "It helps you understand the question and respond appropriately."
        },
        {
          q: "How should you leave the interview?",
          a: "Thank the interviewer and leave politely."
        },
        {
          q: "How should you behave in a video interview?",
          a: "Check your technology, maintain professional appearance and communicate clearly."
        },
        {
          q: "What should your background look like in a video interview?",
          a: "Use a clean, quiet and distraction-free environment."
        },
        {
          q: "How should you handle technical problems?",
          a: "Remain calm, communicate the issue and try the appropriate solution."
        },
        {
          q: "How should you speak to senior professionals?",
          a: "Use respectful and professional communication."
        },
        {
          q: "What is professional etiquette?",
          a: "It refers to appropriate professional behaviour, communication and respect in workplace interactions."
        },
        {
          q: "Why is punctuality part of etiquette?",
          a: "It demonstrates respect, responsibility and professionalism."
        },
        {
          q: "How should you react if you disagree?",
          a: "Express your perspective respectfully and focus on the issue."
        },
        {
          q: "How should you behave while waiting?",
          a: "Remain calm, polite and professional."
        },
        {
          q: "What is professional communication?",
          a: "Communication that is clear, respectful, appropriate and focused on the situation."
        }
      ]
    },

    {
      id: 9,
      icon: "🧩",
      title: "Situational & Behavioral Questions",
      description:
        "Learn how to answer teamwork, challenge and real-world situation questions.",
      question: "Tell me about a time you faced a challenge.",
      points: [
        "Describe the situation.",
        "Explain your responsibility.",
        "Describe the action you took.",
        "Explain the result.",
        "Mention what you learned."
      ],
      sample:
        "During one of my projects, our team faced a challenge while integrating different parts of the system. I discussed the issue with my team members, divided the problem into smaller tasks and worked on my assigned technical part. We completed the integration successfully and I learned the importance of communication and teamwork.",
      mistakes: [
        "Do not blame team members.",
        "Do not describe only the situation.",
        "Do not exaggerate your role.",
        "Mention what you learned."
      ],
      practiceQuestions: [
        {
          q: "Tell me about a time you faced a challenge.",
          a: "Use the STAR structure: Situation, Task, Action and Result."
        },
        {
          q: "Tell me about a time you worked in a team.",
          a: "Describe the team situation, your responsibility, your contribution and the outcome."
        },
        {
          q: "Tell me about a conflict you handled.",
          a: "Explain the disagreement objectively and describe how you helped reach a solution."
        },
        {
          q: "Tell me about a mistake you made.",
          a: "Describe the mistake honestly, explain the correction and mention what you learned."
        },
        {
          q: "Tell me about a time you showed leadership.",
          a: "Describe a situation where you took responsibility and helped move the team forward."
        },
        {
          q: "Tell me about a time you helped someone.",
          a: "Explain the situation, the help you provided and the outcome."
        },
        {
          q: "Tell me about a difficult deadline.",
          a: "Explain how you prioritized work and managed the deadline."
        },
        {
          q: "Tell me about a failure.",
          a: "Describe what happened, what you learned and how you improved afterward."
        },
        {
          q: "Tell me about a time you adapted to change.",
          a: "Explain the change, how you adjusted and the result."
        },
        {
          q: "Tell me about a time you solved a problem.",
          a: "Describe the problem, your approach and the result."
        },
        {
          q: "Tell me about a time you received feedback.",
          a: "Explain the feedback and how you used it to improve."
        },
        {
          q: "Tell me about a time you disagreed with someone.",
          a: "Describe how you discussed the difference respectfully and reached an appropriate outcome."
        },
        {
          q: "Tell me about a time you took initiative.",
          a: "Explain what you noticed, what action you took and what happened."
        },
        {
          q: "Tell me about a time you learned something quickly.",
          a: "Describe the skill, why you needed it and how you learned it."
        },
        {
          q: "Tell me about a stressful situation.",
          a: "Explain how you stayed organized and handled the situation."
        },
        {
          q: "Tell me about a time you motivated a team.",
          a: "Describe your approach and the resulting team progress."
        },
        {
          q: "Tell me about a time you had multiple tasks.",
          a: "Explain how you prioritized tasks and managed your time."
        },
        {
          q: "Tell me about a time you helped solve a team problem.",
          a: "Explain your contribution and how it supported the team."
        },
        {
          q: "Tell me about a time you had limited resources.",
          a: "Explain how you adapted and found a practical solution."
        },
        {
          q: "Tell me about a time you had to learn from failure.",
          a: "Explain the failure, lesson learned and the change you made afterward."
        },
        {
          q: "Tell me about a time you achieved a goal.",
          a: "Describe the goal, actions taken and the final result."
        }
      ]
    },

    {
      id: 10,
      icon: "🧠",
      title: "Problem-Solving Questions",
      description:
        "Learn how to approach logical, analytical and real-world problems.",
      question: "How do you approach a problem you have never solved before?",
      points: [
        "Understand the problem.",
        "Break it into smaller parts.",
        "Identify possible solutions.",
        "Choose a suitable approach.",
        "Test and improve the solution."
      ],
      sample:
        "When I face a new problem, I first understand the requirements clearly. Then I break the problem into smaller parts and identify possible solutions. I compare the approaches and select the most suitable one. Finally, I test the solution and make improvements if required.",
      mistakes: [
        "Do not start solving before understanding the problem.",
        "Do not choose the first solution immediately.",
        "Consider possible edge cases.",
        "Explain your thinking clearly."
      ],
      practiceQuestions: [
        {
          q: "How do you approach a new problem?",
          a: "Understand the problem, break it into parts, identify solutions and test the chosen approach."
        },
        {
          q: "How do you debug an error?",
          a: "Reproduce the error, inspect the relevant code, identify the cause, fix it and test again."
        },
        {
          q: "How do you solve a complex problem?",
          a: "Break it into smaller manageable problems and solve them systematically."
        },
        {
          q: "What do you do when your solution fails?",
          a: "Analyze the failure, identify the cause and modify or replace the approach."
        },
        {
          q: "How do you choose between two solutions?",
          a: "Compare correctness, complexity, resources, maintainability and requirements."
        },
        {
          q: "How do you handle an unfamiliar problem?",
          a: "Understand the requirements, research where appropriate and develop the solution step by step."
        },
        {
          q: "What is your problem-solving process?",
          a: "Understand, analyze, plan, implement, test and improve."
        },
        {
          q: "How do you identify the root cause?",
          a: "Analyze symptoms, reproduce the issue and trace the problem to its underlying cause."
        },
        {
          q: "How do you handle incomplete information?",
          a: "Identify what is known, clarify important missing information and state assumptions when appropriate."
        },
        {
          q: "How do you prioritize problems?",
          a: "Consider impact, urgency, dependencies and available resources."
        },
        {
          q: "How do you test a solution?",
          a: "Test normal cases, boundary cases and relevant failure conditions."
        },
        {
          q: "Why is breaking a problem useful?",
          a: "Smaller parts are easier to understand, test and solve."
        },
        {
          q: "How do you handle repeated errors?",
          a: "Look for the underlying cause instead of repeatedly applying temporary fixes."
        },
        {
          q: "How do you make technical decisions?",
          a: "Compare possible approaches against requirements, trade-offs and expected outcomes."
        },
        {
          q: "How do you solve a problem under time pressure?",
          a: "Identify the most important requirement, choose a practical approach and validate the result."
        },
        {
          q: "What if you cannot solve a problem alone?",
          a: "Explain what you tried and ask an appropriate teammate or mentor for guidance."
        },
        {
          q: "How do you improve a solution?",
          a: "Review correctness, performance, readability and maintainability."
        },
        {
          q: "How do you handle edge cases?",
          a: "Identify unusual but valid inputs and test whether the solution handles them correctly."
        },
        {
          q: "How do you explain your solution?",
          a: "Explain the approach, important decisions, complexity when relevant and expected result."
        },
        {
          q: "How do you learn from a solved problem?",
          a: "Review the approach, understand alternative solutions and identify lessons for future problems."
        },
        {
          q: "What is more important: speed or correctness?",
          a: "Correctness is essential, while speed should be improved without compromising required correctness."
        }
      ]
    }
  ];

  // =========================
  // VOICE
  // =========================

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Voice reading is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    speech.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    speech.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(speech);
  };

  const speakLesson = () => {
    if (!selectedLesson) return;

    const text = `
      ${selectedLesson.title}.
      Interview question.
      ${selectedLesson.question}.
      How to answer.
      ${selectedLesson.points.join(". ")}.
      Sample answer.
      ${selectedLesson.sample}.
      Common mistakes.
      ${selectedLesson.mistakes.join(". ")}.
    `;

    speakText(text);
  };

  const speakPracticeAnswer = () => {
    if (!selectedLesson) return;

    const practice =
      selectedLesson.practiceQuestions[currentPractice];

    speakText(
      `Interview question. ${practice.q}.
      Suggested answer. ${practice.a}`
    );
  };

  const pauseLesson = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeLesson = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopLesson = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // =========================
  // OPEN LESSON
  // =========================

  const openLesson = (lesson) => {
    window.speechSynthesis.cancel();

    setSelectedLesson(lesson);
    setCurrentPractice(0);
    setShowPracticeAnswer(false);
    setIsSpeaking(false);
    setIsPaused(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const backToLessons = () => {
    stopLesson();

    setSelectedLesson(null);
    setCurrentPractice(0);
    setShowPracticeAnswer(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =========================
  // PRACTICE NAVIGATION
  // =========================

  const nextPractice = () => {
    if (
      currentPractice <
      selectedLesson.practiceQuestions.length - 1
    ) {
      setCurrentPractice((prev) => prev + 1);
      setShowPracticeAnswer(false);
      stopLesson();
    }
  };

  const previousPractice = () => {
    if (currentPractice > 0) {
      setCurrentPractice((prev) => prev - 1);
      setShowPracticeAnswer(false);
      stopLesson();
    }
  };

  // =========================
  // CLEANUP VOICE
  // =========================

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // =========================
  // DETAIL PAGE
  // =========================

  if (selectedLesson) {
    const practice =
      selectedLesson.practiceQuestions[currentPractice];

    return (
      <div className="learning-page">

        <button
          className="home-btn"
          onClick={onHomeClick}
        >
          ← Home
        </button>

        <header className="learning-header">

          <div>
            <h1>Interview Learning Hub</h1>

            <p>
              Learn how to answer interview questions
              confidently and professionally.
            </p>
          </div>

          <div className="learning-logo">
            CLEVONIX
          </div>

        </header>

        <main className="lesson-detail">

          <button
            className="back-lessons-btn"
            onClick={backToLessons}
          >
            ← Back to Lessons
          </button>

          <div className="detail-icon">
            {selectedLesson.icon}
          </div>

          <h2>
            {selectedLesson.title}
          </h2>

          {/* MAIN QUESTION */}

          <div className="question-highlight">

            <span>
              INTERVIEW QUESTION
            </span>

            <h3>
              {selectedLesson.question}
            </h3>

          </div>

          {/* LISTEN */}

          <div className="listen-card">

            <div className="listen-icon">
              🎧
            </div>

            <div className="listen-content">

              <h3>
                Listen & Learn
              </h3>

              <p>
                Listen to the complete lesson explanation
                using voice.
              </p>

            </div>

            <div className="listen-controls">

              {!isSpeaking && (
                <button
                  className="listen-btn"
                  onClick={speakLesson}
                >
                  🔊 Listen to Lesson
                </button>
              )}

              {isSpeaking && !isPaused && (
                <button
                  className="pause-btn"
                  onClick={pauseLesson}
                >
                  ⏸ Pause
                </button>
              )}

              {isSpeaking && isPaused && (
                <button
                  className="resume-btn"
                  onClick={resumeLesson}
                >
                  ▶ Resume
                </button>
              )}

              {isSpeaking && (
                <button
                  className="stop-voice-btn"
                  onClick={stopLesson}
                >
                  ⏹ Stop
                </button>
              )}

            </div>

          </div>

          {/* HOW TO ANSWER */}

          <div className="detail-section">

            <h3>
              📌 How to Answer
            </h3>

            <ul>
              {selectedLesson.points.map(
                (point, index) => (
                  <li key={index}>
                    {point}
                  </li>
                )
              )}
            </ul>

          </div>

          {/* SAMPLE ANSWER */}

          <div className="example-box">

            <h3>
              📝 Sample Answer
            </h3>

            <p>
              {selectedLesson.sample}
            </p>

          </div>

          {/* COMMON MISTAKES */}

          <div className="mistakes-box">

            <h3>
              ⚠️ Common Mistakes
            </h3>

            <ul>
              {selectedLesson.mistakes.map(
                (mistake, index) => (
                  <li key={index}>
                    {mistake}
                  </li>
                )
              )}
            </ul>

          </div>

          {/* ==================================
              PRACTICE QUESTIONS
          ================================== */}

          <section className="practice-questions-section">

            <div className="practice-heading">

              <div>
                <span>
                  PRACTICE MODE
                </span>

                <h2>
                  Practice Questions
                </h2>

                <p>
                  Practice real interview questions
                  and learn how to structure your answers.
                </p>
              </div>

              <div className="practice-count">
                {currentPractice + 1}
                <small>
                  / {selectedLesson.practiceQuestions.length}
                </small>
              </div>

            </div>

            {/* PRACTICE QUESTION CARD */}

            <div className="practice-question-card">

              <div className="practice-number">
                Question {currentPractice + 1}
              </div>

              <h3>
                {practice.q}
              </h3>

              <div className="answer-actions">

                <button
                  className="show-answer-btn"
                  onClick={() =>
                    setShowPracticeAnswer(
                      !showPracticeAnswer
                    )
                  }
                >
                  {showPracticeAnswer
                    ? "🙈 Hide Answer"
                    : "💡 Show Answer"}
                </button>

                <button
                  className="listen-answer-btn"
                  onClick={speakPracticeAnswer}
                >
                  🎧 Listen to Answer
                </button>

              </div>

              {showPracticeAnswer && (

                <div className="practice-answer">

                  <div className="answer-title">
                    📝 Suggested Answer
                  </div>

                  <p>
                    {practice.a}
                  </p>

                </div>

              )}

            </div>

            {/* NAVIGATION */}

            <div className="practice-navigation">

              <button
                className="practice-prev"
                onClick={previousPractice}
                disabled={currentPractice === 0}
              >
                ← Previous
              </button>

              <div className="question-dots">

                {selectedLesson.practiceQuestions.map(
                  (_, index) => (
                    <button
                      key={index}
                      className={
                        index === currentPractice
                          ? "dot active-dot"
                          : "dot"
                      }
                      onClick={() => {
                        stopLesson();
                        setCurrentPractice(index);
                        setShowPracticeAnswer(false);
                      }}
                    >
                      {index + 1}
                    </button>
                  )
                )}

              </div>

              <button
                className="practice-next"
                onClick={nextPractice}
                disabled={
                  currentPractice ===
                  selectedLesson.practiceQuestions.length - 1
                }
              >
                Next Question →
              </button>

            </div>

          </section>

          <button
            className="back-lessons-main-btn"
            onClick={backToLessons}
          >
            ← Explore More Lessons
          </button>

        </main>

      </div>
    );
  }

  // =========================
  // LEARNING HUB
  // =========================

  return (
    <div className="learning-page">

      <button
        className="home-btn"
        onClick={onHomeClick}
      >
        ← Home
      </button>

      <header className="learning-header">

        <div>
          <h1>
            Interview Learning Hub
          </h1>

          <p>
            Learn how to answer interview questions
            confidently and professionally.
          </p>
        </div>

        <div className="learning-logo">
          CLEVONIX
        </div>

      </header>

      {/* HERO */}

      <section className="learning-hero">

        <span>
          AI INTERVIEW LEARNING
        </span>

        <h2>
          Learn. Practice. Improve.
        </h2>

        <p>
          Build your interview skills with practical
          lessons, examples and voice-based learning.
        </p>

      </section>

      {/* TITLE */}

      <section className="learning-section-title">

        <h2>
          Interview Preparation Topics
        </h2>

        <p>
          Choose a topic and learn how to answer
          interview questions effectively.
        </p>

      </section>

      {/* LESSONS */}

      <section className="lesson-grid">

        {lessons.map((lesson) => (

          <div
            className="lesson-card"
            key={lesson.id}
          >

            <div className="lesson-icon">
              {lesson.icon}
            </div>

            <h3>
              {lesson.title}
            </h3>

            <p>
              {lesson.description}
            </p>

            <div className="question-badge">
              {lesson.practiceQuestions.length} Practice Questions
            </div>

            <button
              className="learn-btn"
              onClick={() => openLesson(lesson)}
            >
              Learn Now →
            </button>

          </div>

        ))}

      </section>

    </div>
  );
}

export default LearningHub;