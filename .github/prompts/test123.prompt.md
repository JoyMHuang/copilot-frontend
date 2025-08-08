# Test Generation Guidelines 
- Write unit tests using Jest. 
- Each test method should be named using the pattern: 
应该[DoSomething]当[Condition]. 
- Cover all public methods, including edge cases and error 
handling. 
- Use clear assertions and meaningful test data. 
- Prefer descriptive test method names that specify the scenario 
and expected outcome. 
- Include both positive and negative test cases, covering edge 
conditions. 
- Add comments to clarify the intent of complex test logic. 
- Validate not only the output but also side effects (such as state 
changes or exceptions). 
- Clean up any resources or data created during the test in 
teardown methods. 
- Use parameterized tests for repetitive logic with different input 
values. 
- Avoid hardcoding values that may change; use constants or 
builders where appropriate.
- Review and update tests regularly as the codebase evolves. 
