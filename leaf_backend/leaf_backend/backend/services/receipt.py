from abc import ABC, abstractmethod


class Strategy(ABC):
    @abstractmethod
    def get_blocks(self, lines):
        pass


class DefaultStrategy(Strategy):
    def get_blocks(self, lines):
        blocks = []
        row = 0
        column = 0
        begin_row = 0
        while len(lines) - 2 > row:

            # Check end_col
            col_pos = len(lines[row])
            column = col_pos if column < col_pos else column

            # If the length of repeated characters is not greater than 1 + '-' or 1
            # or there's a line space, creates a new block
            # I have considered repeated characters and spaces as a separator as it
            # doesn't contain useful data
            condition = lines[row + 1] == '' or len("".join(set(lines[row + 1])).strip()) <= 2
            while condition and len(lines) - 2 > row:
                row += 1
                # START Check end_col
                col_pos = len(lines[row])
                column = col_pos if column < col_pos else column
                # END Check end_col
                condition = lines[row + 1] == '' or len("".join(set(lines[row + 1])).strip()) <= 2
                if not condition:
                    # The indexes start from 0
                    blocks.append({"begin_row": begin_row, "begin_col": 0, "end_row": row, "end_col": column - 1})
                    begin_row = row + 1
                    column = 0

            row += 1

        # Check end_col
        col_pos = len(lines[row])
        column = col_pos if column < col_pos else column
        blocks.append({"begin_row": begin_row, "begin_col": 0, "end_row": row, "end_col": column - 1})

        return blocks


# Change the name of the class if needed
class SomeStrategy(Strategy):
    def get_blocks(self, data):
        return data


class ReceiptService():
    def __init__(self):
        self._strategy = DefaultStrategy()

    def set_strategy(self, strategy: Strategy):
        self._strategy = strategy

    def get_blocks(self, lines):
        return self._strategy.get_blocks(lines)


