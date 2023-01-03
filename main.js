const sword = {
  damage: 10,
  critical: 5,
  criticalDamage: 2.0,
  durability: 100,
  sharpness: 2,
}

const enemy = {
  name: 'Boar',
  level: 1,
  hp: 50,
}

const balance = {
  gold: 25,
  total: 0,
  enemiesKilleds: 1,
}

function reset() {
  localStorage.clear()

  sword.damage = 10
  sword.critical = 5
  sword.criticalDamage = 2.0
  sword.durability = 100
  sword.sharpness = 2

  balance.gold = 25
  balance.enemiesKilleds = 1

  enemy.hp = 50
  enemy.level = 1

  print()
  saveState()
}

function loadState() {
  if (localStorage.length > 0) {
    sword.damage = localStorage.getItem('damage')
    sword.critical = localStorage.getItem('critical')
    sword.criticalDamage = localStorage.getItem('criticalDamage')
    sword.durability = localStorage.getItem('durability')
    sword.sharpness = localStorage.getItem('sharpness')

    enemy.hp = localStorage.getItem('hp')
    enemy.level = localStorage.getItem('level')

    balance.enemiesKilleds = localStorage.getItem('enemiesKilleds')
    balance.gold = localStorage.getItem('gold')

  } else {
    reset()
  }
}

function saveState() {
  var damage = localStorage.setItem('damage', sword.damage)
  var critical = localStorage.setItem('critical', sword.critical)
  var criticalDamage = localStorage.setItem('criticalDamage', sword.criticalDamage)
  var durability = localStorage.setItem('durability', sword.durability)
  var sharpness = localStorage.setItem('sharpness', sword.sharpness)

  var hp = localStorage.setItem('hp', enemy.hp)
  var level = localStorage.setItem('level', enemy.level)

  var gold = localStorage.setItem('gold', balance.gold)
  var enemiesKilleds = localStorage.setItem('enemiesKilleds', balance.enemiesKilleds)
}

function print() {
  document.querySelector(".damage").innerHTML = 'Damage: ' + sword.damage
  document.querySelector(".critical").innerHTML = 'Critical: ' + sword.critical + '% - critical multiplier: ' + sword.criticalDamage
  document.querySelector(".durability").innerHTML = 'Durability: ' + sword.durability
  document.querySelector(".sharpness").innerHTML = 'Sharpness: ' + sword.sharpness
  document.querySelector('.enemy').innerHTML = 'Foe: ' + enemy.name
  document.querySelector('.level').innerHTML = 'Level: ' + enemy.level
  document.querySelector('.hp').innerHTML = 'Hp: ' + enemy.hp
  document.querySelector('.balance').innerHTML = 'Gold: ' + balance.gold
  document.querySelector('.strike').addEventListener('click', strike)

  document.querySelector('.upgradeDamage').addEventListener('click', upgradeDamage)
  document.querySelector('.upgradeCritical').addEventListener('click', upgradeCritical)
  document.querySelector('.repairSword').addEventListener('click', repairSword)
  document.querySelector('.sharpSword').addEventListener('click', sharpSword)
}

function strike() {
  if (sword.durability > 0) {
    if (Math.floor(Math.random() * 100) <= sword.critical) {
      enemy.hp = enemy.hp - sword.damage * sword.criticalDamage
      sword.durability--
    } else {
      enemy.hp = enemy.hp - sword.damage
      sword.durability--
    }

  } else {
    enemy.hp = enemy.hp - (sword.damage / 4)
  }
  if (enemy.hp < 1) {
    balance.enemiesKilleds++
    enemy.hp = balance.enemiesKilleds * 50
    enemy.level++
    balance.gold += 25
  }
  saveState()
  print()
}

function upgradeDamage() {
  if (balance.gold >= 25) {
    sword.damage += 5
    balance.gold -= 25
    print()
    saveState()

  } else {
    window.alert('NOT ENOUGH GOLD')
  }
}

function upgradeCritical() {
  if (balance.gold >= 25) {
    if (sword.critical == 100) {
      sword.criticalDamage = Number(Math.round(sword.criticalDamage + 0.1)).toFixed(2)
    } else {
      sword.critical++
    }
    balance.gold -= 25
    print()
    saveState()

  } else {
    window.alert('NOT ENOUGH GOLD')
  }
}

function repairSword() {
  if (balance.gold >= 25 && sword.durability != sword.durability + (sword.sharpness * 50)) {
    sword.durability = 100 + (sword.sharpness * 50)
    balance.gold -= 25
    print()
    saveState()

  } else {
    window.alert('NOT ENOUGH GOLD')
  }
}

function sharpSword() {
  if (balance.gold >= 25) {
    sword.sharpness++
    sword.durability += 50
    balance.gold -= 25
    print()
    saveState()

  } else {
    window.alert('NOT ENOUGH GOLD')
  }
}

function Init() {
  loadState()
  print()
}

Init()