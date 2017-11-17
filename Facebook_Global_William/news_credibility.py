import pandas as pd

df = pd.read_csv("news_sources.csv")

def is_in_csv(source):
    new_df = df['url']
    new_df = list(new_df)
    return source in new_df

def remove_misc(source):
    if 'http://' in source:
        source = source[11:]
    if 'https://' in source:
        source = source[12:]
    if '/' in source:
        source = source[:source.index('/')]
    return source

def checker(source):
    glob_row = 0
    rel_vals = ['bias', 'clickbait', 'conspiracy', 'fake', 'hate',
                'junksci', 'rumor', 'satire', 'unreliable']
    if not is_in_csv(source):
        return True
    else:
        retval = False
        for row in range(len(df['url'])):
            if source == df['url'][row]:
                glob_row = row
                reliability = df['type'][row]
        if reliability in rel_vals:
            return False
        else:
            if reliability == 'political':
                if df['2nd type'][glob_row] == 'reliable':
                    return True
                else:
                    return False
            return True

def is_reliable(source):
    source = remove_misc(source)
    return checker(source)
