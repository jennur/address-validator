# Address Validator 🏡🏘️

This simple application is an address validator tool, which lets you enter an address and validate it against the [DI Address Helper API](https://jira-di.atlassian.net/wiki/spaces/DIPUB/pages/504660001/DI+Address+Helper+V2).

> Note: This version assumes the country code is NO, i.e. it will only display addresses within Norway.

## Technologies used
- Vite
- React
- TypeScript
- SCSS
- Jest
- Axios

## How to run
###  Install dependencies
The first thing we need to do is to install the dependencies defined in `package.json`. From the root folder, run:

```bash
npm i
```

If successfull, all the dependencies should be available in the `node_modules` folder at the root level of the project.

### Run the development server
For everything to work correctly, you need to make sure you have a valid API key available in your `.env` file, otherwise the application won't be able to make any requests to the API. 

1. Copy the `.env.example`, rename it to `.env` and replace `your_api_key` with the valid key.

2. Now you can run the development server
```bash
npm run dev
```
That's it! 🚀 

The application should now be running at `http://localhost:5173`

### Build for production
To make a production ready bundle, run the following command from the root folder:
```bash
npm run build
```
This will create a `dist` folder at root level. Now you can run the following that will load the application from the `dist` folder:
```bash
npm run preview
```
The application should now be running at `http://localhost:4173/`.

## The Address Form

### Confirming a street name
The address form lets you enter a street address and will then make a call to `/NO/streetSearch/{streetName}`. If any results found, a dropdown will appear with suggestions that match what you entered in the input field. 

The city name will show next to the street name in the dropdown, and will be autocompleted once selected.

### Confirming a street number 
Once you have selected an option from the suggestions-dropdown, the form will have the necessary `streetIds` available to query the street numbers. Now, when you enter a street number in the street number field, a call will be made to `/NO/streetNumberSearch/{streetIds}?streetNumber={inputValue}`. If any results found, a dropdown will appear with matching street numbers. If an entrance number is available, this will be displayed next to the street number. For duplicated street numbers, the building type will be specified next to the numbers. 

Selecting a street number from the dropdown will autocomplete the postal code.

### Confirmed address
After selecting a street number, the address is complete, as postal code and city was autocompleted from the street name and number suggestions. The complete address object is available in the local state of the `AddressForm` component.

## Known issues / TODOs
Some of the known issues are listed here, along with TODO comments within the code, but the list is not complete.

### Missing fields
There are some missing auto complete fields that could be implemented to enhance the address verification, such as floors and households.

### DX Issues
#### Incomplete components
1. The `TextInput` component could be made more reusable by supporting more attributes and event handlers. It should also be able to display an error message.
2. In the `AutoCompleteInput` the suggestion list could be moved to a separate component, e.g. `DropdownList` to make it reusable for other types of dropdown components. The `IInputSuggestion` interface should then be renamed to `IDropdownItem`.

#### Component styling
The styling for each component should be organized within each component folder to make everything component-specific immediately available to the developer – although this might be a matter of personal preference.

### UX issues
There are several layout and/or UX issues that should be improved.

#### Dropdown scrolling
The dropdown does not have a max height nor scrolling within the container – the entire page will scroll.

#### No indications of no results
There is currently nothing indicating that no results were found during the data fetching, if this was the case. 

#### Limited error handling
Currently, the UI has limited error messages when something does not work as expected. This needs to be improved.

### Testing does not work as expected
Jest is installed, but not properly configured, although there are a couple tests added in order to show the idea.