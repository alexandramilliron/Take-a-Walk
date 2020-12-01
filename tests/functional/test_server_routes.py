def test_home_page(client, init_database): # testing with fixtures 
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check that the response is valid
    """
    response = client.get('/')
    assert response.status_code == 200
    assert b"Take a Walk" in response.data
    # assert b"Need an account?" in response.data
    # assert b"Existing user?" in response.data


