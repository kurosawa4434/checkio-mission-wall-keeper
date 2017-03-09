"""
CheckiOReferee is a base referee for checking you code.
    arguments:
        tests -- the dict contains tests in the specific structure.
            You can find an example in tests.py.
        cover_code -- is a wrapper for the user function and additional operations before give data
            in the user function. You can use some predefined codes from checkio.referee.cover_codes
        checker -- is replacement for the default checking of an user function result. If given, then
            instead simple "==" will be using the checker function which return tuple with result
            (false or true) and some additional info (some message).
            You can use some predefined codes from checkio.referee.checkers
        add_allowed_modules -- additional module which will be allowed for your task.
        add_close_builtins -- some closed builtin words, as example, if you want, you can close "eval"
        remove_allowed_modules -- close standard library modules, as example "math"

checkio.referee.checkers
    checkers.float_comparison -- Checking function fabric for check result with float numbers.
        Syntax: checkers.float_comparison(digits) -- where "digits" is a quantity of significant
            digits after coma.

checkio.referee.cover_codes
    cover_codes.unwrap_args -- Your "input" from test can be given as a list. if you want unwrap this
        before user function calling, then using this function. For example: if your test's input
        is [2, 2] and you use this cover_code, then user function will be called as checkio(2, 2)
    cover_codes.unwrap_kwargs -- the same as unwrap_kwargs, but unwrap dict.

"""

from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import cover_codes
from tests import TESTS
from itertools import chain


def check_result(wall, user_result):
    if not isinstance(user_result, list):
        return False, user_result, 'Result is not list'
    for r in user_result:
        if not isinstance(r, int) or r < 1 or r > 25:
            return False, r, str(r)+' is not an integer from 1 to 25' 
            # return False, r, ' is not an integer from 1 to 25' 
        
    w = [list(map(int, r)) for r in wall]
    for a in user_result:
        r, c = (a-1) // len(w), (a-1) % len(w[0])
        w[r][c] = 1 - w[r][c]
        if r+1 < len(w):
            w[r+1][c] = 1 - w[r+1][c]
        if r-1 > -1:
            w[r-1][c] = 1 - w[r-1][c]
        if c+1 < len(w[0]):
            w[r][c+1] = 1 - w[r][c+1]
        if c-1 > -1:
            w[r][c-1] = 1 - w[r][c-1]
    # return sum(chain(*w)) == 0, user_result, 'Success'
    return sum(chain(*w)) == 0, user_result

api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        function_name={
            "python": "wall_keeper",
            "js": "wallKeeper"
        },
        checker=check_result,
    ).on_ready)
