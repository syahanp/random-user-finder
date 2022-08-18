# Random User Finder

A really fast app to search random user with advance table functionalities.

https://vercel.com/syahanp/random-user-finder

## Table of contents
- [Setup](#setup)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Approach](#approach)
- [How I Optimize the App](#how-i-optimize-the-app)
- [Credits](#credits)

## Setup

### Installation
Please use latest node version, at least version 16 or above
Clone this repository to your desktop and run `yarn install` to install all the dependencies.

Then you can run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your preferred browser to open the app.

### Test
Run `yarn test` to start testing with coverage

## Features
- Search user by keyword
- Filter user by gender
- Column sorting
- Pagination

## Technology Stack
### NextJS 12
Next.js has been around for only a couple years, but it is already one of the most popular tools in the React ecosystem. A big reason for that is the fact that Next.js is built on top of React, which is my first choice when it comes to web applications. When it comes to SEO, Image Optimization, Data Fetching, Routes -- NextJS is a life safer! We can just focuses with product output and innovation on how to make it better product, rather than stressed with bundler setup and maintaining non related product development. hence, for this project, NextJS help me ship the app faster with zero configuration. 

### TailwindCSS
Before there was a tailwind, there was a lot to prepare just for styling. such as resetting default CSS, color variable, class naming convention, overlapping CSS classes, and so on. With tailwind, all those rituals were completed out of the box. Tailwind delivers fast styling, flexibility, and styling consistency. Tailwind already has a design system and adequate classes to be able to develop quickly. This library was my first rescue when it comes to fast development process. In the end, we can more focuses on innovation, not styling.

### React Query v4 by Tanstack
React Query is a great hook library for managing data requests that completely removes the need to put your remote data inside the global state. We just need to tell the library where to fetch your data, and it will handle caching, background updates, and stale data without any extra code or configuration. React Query hooks like `useQuery` will help us store server data like a global state. With 3-4 line of code, we can distribute the data throughout the app without fear of double fetching as we call the hooks again and again. We would rarely see loading spinner when the data is not there yet because it will handle the need to refetch when the data is stale. React Query is one of my strategy to optimize this app, as i will explain in section [How I Optimize the App](#how-i-optimize-the-app)

### React Testing Library and Mock Service Worker (MSW) 
In real case, user won't see the implementation details like what state or props are currently in our application. They only see the rendered HTML elements on the browser. React Testing Library encourages us to test the behavior instead of implementation details. By testing our app the way user would use it, we can be confident that out application will behave as expected. And for the complete real case integration with API transaction, i'm using MSW to mock the API. This will help us to test our app behavior when fetching data to the API.


## Approach
### Table
For more than 3 years as a React developer, i always hate it when it comes to table. I always use a third party library such as React Table or AG-Grid. This two is at top of my list when it comes to table development. But as developers, we must quickly learn and adapt to changes. Must keep going back to basics, and understand everything from its roots. So in this project, I deliberately forced myself learning to develop a table which of course with a best practice.

Inspired by React Table, I tried to create a table that is not only flexible but also readable, and of course with the spirit of headless UI. I made my own logic, as well as my own table style. The simple logic that I created in the `useTableRenderer` hooks allows me to create flexible tables according to the needs of this project.
   
    const columns: ColumnDefs[] = [
	    {
		accessor: "username",
		label: "Username",
		sortable: false,
		cellRenderer: data => data.login.username,
	    },
	    {
	    	accessor: "name",
		label: "Name",
		cellRenderer: data => `${data.name.first}  ${data.name.last}`,
	    },
	    {
	    	accessor: "email",
		label: "Email",
	    },
	    {
	    	accessor: "gender",
		label: "Gender",
	    },
	    {
	    	accessor: "date",
		label: "Registered Date",
		cellRenderer: data => formatDate(data.registered.date),
	    },
    ]


notice the column definition above, how `cellRenderer` can make each cell can be modified as needed like date formatting or JSX rendering. Like in the Name column where we need to combine 2 values ​​in the received JSON data, or in the Registered Date column where we need to do date formatting. Then we can also set which columns cannot use the sorting function, such as in the Username column by including `sortable: false` 


### State Management
By using React Query as cache storage for server state data, this application no longer need global state management. The state in this application is purely just storing the state of a UI. Hence, the name is **state**: used to store the state of the UI, not the data. Usually, the common way to implement global state management is using React Context or Redux. 

## How I Optimize the App

### Debounce Searching, Filtering and Sorting
The first technique that is commonly used when developing search applications is the use of Debounce technique. However, this application does little different from what is commonly used. Here, the debunce technique is not only applied for the search box, but in all filter actions that make us have to make direct API calls: searching, filtering, and sorting.

The `useDebounceValue` that I created allows us to debounce any value that we want to pending within the specified time. With this, I can debounce as well for the sorting process: one of the actions that may be vulnerable to abuse by the user. How did it happen? It is possible for the user to click on the column header to sort several times so fast. With this technique, notice when user clicks several times we only made direct API call once. The sorting behavior in the UI interaction is instant, but the fetching is debounced.

### Data Caching (stale-while-revalidate)
As i mentioned, this application is very wide with user abuse because the core of this application is searching and filtering. Therefore, it is important to choose the right architecture to make it fast and comfortable to use. One of the strategies commonly used is the debounce technique, as I explained earlier. But that is not enough. More advanced techniques are needed to make it faster, thanks to React Query. With the `stale-while-revalidate` strategy, it allows apps to only fetch  when data in cache storage is stale. In other words, when the user performs a query with the same parameters as before, our app will not make a direct API call. Instead, it will check the cache storage first. If the data is found in the cache, and is not stale yet, then our app will display the cached data. If it stale, then React Query will trying to fetch again with the query behind the scene, while we displaying the staled data. When the fetch is successful, React Query will update the cache storage with fresh data and display it to the user right away.

To test it, we can run through scenario:
1. search for "bob" 
2. then filter its gender to "male"
3. then sort email column
4. click reset filter button

You would notice that we are not make an API call after we click reset filter button. its because React Query cached the data in the first load, the first API call when the app is loaded.

## Credits
- [randomuser.me](https://randomuser.me)
