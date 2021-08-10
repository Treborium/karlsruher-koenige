export default class Donors {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async addName(name: string): Promise<string[]> {
    const response = await fetch(this.url + '/donor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const json = await response.json();
    console.log(json['donors']);
    return json['donors'];
  }

  async removeName(name: string): Promise<string[]> {
    const response = await fetch(this.url + '/donor', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const json = await response.json();
    console.log(json['donors']);
    return json['donors'];
  }

  async getNames(): Promise<string[]> {
    const response = await fetch(this.url + '/donors');
    const json = await response.json();
    return json['donors'];
  }
}
