"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

from random import randint
from itertools import chain

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
        tests.append(list(i for i, p in enumerate(chain(*w), start=1) if p))
    return tests

random_walls = wall_maker(5)

TESTS = {
    "Basics": [
        {
            "input": [5, 7, 13, 14, 18],
            "answer": [5, 7, 13, 14, 18]
        },
        {
            "input": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            "answer": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
        },
     ],
    "Edges": [
        # corner test (cover 1, 5, 21, 25)
        {
            "input": [1, 2, 4, 5, 6, 10, 16, 20, 21, 22, 24, 25], 
            "answer": [1, 2, 4, 5, 6, 10, 16, 20, 21, 22, 24, 25] 
        },
        # edge test 1 (cover 2, 10, 16, 24)
        {
            "input": [1, 2, 3, 5, 7, 9, 10, 11, 15, 16, 17, 19, 21, 23, 
                        24, 25],
            "answer": [1, 2, 3, 5, 7, 9, 10, 11, 15, 16, 17, 19, 21, 23, 
                        24, 25]
        },
        # edge test 2 (cover 3, 11, 15, 23)
        {
            "input": [2, 3, 4, 6, 8, 10, 11, 12, 14, 15, 16, 18, 20, 22, 
                        23, 24],
            "answer": [2, 3, 4, 6, 8, 10, 11, 12, 14, 15, 16, 18, 20, 22, 
                        23, 24]
        },
        # edge test 3 (cover 4, 6, 20, 22)
        {
            "input": [1, 3, 4, 5, 6, 7, 9, 11, 15, 17, 19, 20, 21, 22, 23, 
                        25],
            "answer": [1, 3, 4, 5, 6, 7, 9, 11, 15, 17, 19, 20, 21, 22, 23, 
                        25]
        },
    ],
    "Randoms": [
        {
            "input": random_walls[0],
            "answer": random_walls[0]
        },
        {
            "input": random_walls[1],
            "answer": random_walls[1]
        },
        {
            "input": random_walls[2],
            "answer": random_walls[2]
        },
        {
            "input": random_walls[3],
            "answer": random_walls[3]
        },
        {
            "input": random_walls[4],
            "answer": random_walls[4]
        },
    ],
}

