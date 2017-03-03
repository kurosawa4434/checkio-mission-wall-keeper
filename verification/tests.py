"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

from random import randint

def wall_maker(n):
    tests = []
    for _ in range(n):
        clicks = [randint(0, 1) for _ in range(25)]
        w = [[0 for _ in range(5)] for _ in range(5)]
        for i, c in enumerate(clicks):
            if c:
                r, c = i // len(w), i % len(w[0])
                w[r][c] = 1 - w[r][c]
                if r+1 < len(w):
                    w[r+1][c] = 1 - w[r+1][c]
                if r-1 > -1:
                    w[r-1][c] = 1 - w[r-1][c]
                if c+1 < len(w[0]):
                    w[r][c+1] = 1 - w[r][c+1]
                if c-1 > -1:
                    w[r][c-1] = 1 - w[r][c-1]
        tests.append([''.join(map(str, row)) for row in w])
    return tests

random_walls = wall_maker(3)

TESTS = {
    "Basics": [
        {
            "input": [
                    '00001',
                    '01000',
                    '00110',
                    '00100',
                    '00000'
            ],
            "answer": [
                    '00001', 
                    '01000', 
                    '00110', 
                    '00100', 
                    '00000'
            ],
        },
        {
            "input": [
                    '11111', 
                    '11111',
                    '11111',
                    '11111',
                    '11111'
            ],
            "answer":[
                    '11111',
                    '11111',
                    '11111',
                    '11111',
                    '11111'
            ],
        },
     ],
    "Randoms": [
        {
            "input": random_walls[0],
            "answer": random_walls[0],
        },
        {
            "input": random_walls[1],
            "answer": random_walls[1],
        },
        {
            "input": random_walls[2],
            "answer": random_walls[2],
        },
    ],
}

