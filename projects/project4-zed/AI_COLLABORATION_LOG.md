AI Tools Used: 
For this project, I used ChatGPT and GitHub Copilot as my main AI collaborators from start to finish. I relied on both tools pretty consistently throughout the development process, not to write the entire project for me, but to help me understand problems, debug broken features, and learn concepts I’d never worked with before. ChatGPT was especially helpful for explaining errors, thinking through logic, and walking me step-by-step through issues like rotation math and state updates. GitHub Copilot played a similar role inside VS Code by suggesting code patterns, completing functions, and helping me catch syntax mistakes. I treated both tools as supportive partners that guided me through the harder parts of the project while still requiring me to rewrite, test, and fully understand the code myself.

Learning Moments & Challenges:
1. Understanding rotation & skew math for the wheel
The biggest challenge was figuring out how to rotate and position each slice of the wheel so that the text appeared upright. AI helped me understand the relationship between: slice angle, skew transformations, and counter-rotating the text. This was a huge learning moment because I never worked with CSS transforms this deeply before.

1. Persistent state management using LocalStorage
Saving and loading data for: options and history. It was defientely confusing at first. AI helped clarify how to structure the objects, update state, and re-render the UI after each change. I learned how to think in terms of “state → render → update → rerender.”

1. Handling Chart.js updates
I learned that Chart.js doesn’t automatically refresh the chart if the dataset changes. AI helped me discover that I needed to destroy the previous chart instance before creating a new one. This felt like a real debugging problem I’d hit in the real world.

1. Debugging missing slices
When one slice on my wheel appeared blank or looked “black,” AI helped me diagnose: off-by-one indexing, missing label, and overlapping transforms. This helped me understand how DOM ordering and CSS positioning can create visual glitches.

1. Communication Matters
A major learning moment was realizing AI is only as helpful as the clarity of my question. When I described the bug in detail, the suggestions were extremely accurate. When I was vague, the answers were not helpful. This actually improved how I talk through technical issues—something that matters in real-world development.

Sample Conversations: 
Conversation 1 — Wheel text not showing
Me: “The words aren’t showing on my wheel. They rotate wrong and disappear. Why?”
AI: Explained skewY math, suggested counter-rotation on labels, and rewrote the label transform.
Outcome: I learned how transforms stack and fixed the disappearing text.

Conversation 2 — One wheel slice turning black
Me: “One of my slices is black or empty. Why?”
AI: Identified that it was caused by a missing option in the array or a slice angle miscalculation.
Outcome: I added console logs and discovered an empty string option sneaking into my array.

Conversation 3 — Chart.js not updating
Me: “My bar chart doesn’t update when I add new picks.”
AI: Told me I needed to destroy the previous chart instance before creating a new one.
Outcome: Implemented that in my code and the chart started working correctly.

Conversation 4 — Debugging the spin animation
Me: “The wheel spins, but it doesn’t line up with the right slice.”
AI: Explained how to calculate the final angle using 360° * numberOfSpins + sliceOffset.
Outcome: My wheel now lands perfectly aligned with the chosen option.

Conversation 5 — Creating a polished UI
Me: “How do I make the app feel more cohesive and ‘finished’?”
AI: Suggested consistent use of CSS variables, alternating slice colors, section spacing, and visual hierarchy.
Outcome: My final interface looks more like a real app instead of a random draft.

Reflection on AI Partnership:
Working with AI during this project honestly felt like having a knowledgeable tutor sitting next to me. It didn’t do the work for me, but it helped me understand concepts faster, debug more confidently, and try ideas I wouldn’t have figured out on my own. I still wrote and rewrote the code myself, but AI accelerated my learning and helped me solve problems without getting stuck for hours. The biggest takeaway is that AI is most powerful when I stay in control of the project. I still had to design the UI, build the structure, write the functions, and debug everything. AI just filled in the gaps when I needed direction or clarity. I also learned how important it is to ask good questions. The more specific I was, the more helpful the responses became. This has genuinely improved my ability to think through problems, document bugs, and communicate like a developer. Overall, the AI partnership made me a more confident programmer. Instead of seeing code as something scary and impossible, I now see it as something I can navigate—especially with tools that support (but do not replace) my own work. This project pushed me creatively and technically, and AI helped me reach a level of polish I’m proud of.