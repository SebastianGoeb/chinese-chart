.mode tabs
select
  n.flds,
  c.ivl,
  c.lapses
from
  cards c
  join notes n on c.nid = n.id
  join decks d on c.did = d.id
where
  d.name like '%New HSK%'
  and c.queue <> -1;