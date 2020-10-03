## Test App for Kontador

### Brief

Develop a JavaScript web application that fetches a relevantly-sized list of posts from the mock [GraphQL API](https://fakerql.stephix.uk/) and displays a histogram representing the number of posts created in each month of 2019.

---

### Info

- The application must be built using React, how you scaffold it is up to you
- We use Apollo for GraphQL API communication, but you can use a different solution if you feel it is better suited
- The histogram must be constructed using D3 or VX (recommended)
- Use Git for version control and to commit any progress you make
- Write a brief summary in your README about your process, your choices and any challenges you faced
- Please do not spend more than 4 hours on development for this task, just submit your progress at the end of that time


### Task Order

1. Project Setup.
    - Create a GitHub repo and clone it.
    - Initialize project with create-react-app.
    - Make initial commit.
2. Test query FakerQL.
    - Install Apollo and hook it up to React.
    - Send a query and console log to make sure the client is working properly.
3. Install VisX and setup basic histogram.
    - Write the required GraphQL query.
    - Use the gql response to generate histogram data.
    - Generate a simple histogram.

**note**
At this point the task requirements are met, but the code is in bad shape and needs refactoring.

4. Refactor Apollo to make use of the provier and useQuery hook.
5. Build and deploy.

---

### Final notes

I was very excited to build this project because it involved technologies that
interested me a lot, but had not had a chance to try them out. To be honest, this was
my first time using GraphQL, Apollo or VisX. For this reason I probably spent about
80% of the allocated time reading documentation.

The code itself was easy to write. Setting up Apollo was quite straightforward, and I really like
how it integrates with the app through the provider and custom hook. The one challenge I faced with
querying the GraphQL server was filtering for posts from 2019. It seems the server only serves posts
from 2019, but I decided to leave a `.filter()` line to make the code more "all round".

Using VisX was probably hardest for me, as there are no "getting started" type guides in the documentation,
and I had to do a bit of reverse engineering and then use the API to customize the graph.

Finally after writing the MVP and doing a little bit of refactoring, I wanted to convert the code to TypeScript.
I had written the necessary type definitions and my IDE was error free, but I ran into some Typescript4 in create-react-app
issues and solving it proved a lot more challenging than what I first thought.
I didn't want to overextend past the allocated time and decided to revert to the previous commit.

Looking forward to hearing your feedback. There are probably numerous things I could have done better
and I am always looking to improve, so feel free to bash my code :)