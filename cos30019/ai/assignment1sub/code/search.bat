@echo off

set command=dotnet run
for %%i in (%*) do call set command=%%command%% %%i
%command%

@REM This piece of code essentially constructs a terminal command to call `dotnet run`, passing in all command-line arguments.
@REM `for %%i in (%*)` loops through the list of command-line arguments passed into the script.
@REM `call set command=%%command%% %%i` appends each argument to the command, which is initially just `dotnet run`.
@REM `%command%` runs the fully constructed command.
@REM Input parsing and error handling is done in C#. I don't want to torture myself doing it here.